import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { Competition } from '../../../models/competition.model';
import { DetailsPouleComponent } from './poule/detailsPoule.component';
import { Subscription } from 'rxjs';
import { Participant } from '../../../models/participant.model';
import { UUID } from 'angular2-uuid';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Match } from '../../../models/match.model';
import { RoundComponent } from '../round/round.component';
import { Round } from '../../../models/round.model';

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  
  @ViewChild(DetailsPouleComponent) detailsPouleComponent: DetailsPouleComponent
  @ViewChild(RoundComponent) roundComponent: RoundComponent

  competition: Competition
  user: User
  participants: Array<Participant>

  subs = new Subscription()

  private isOwner: boolean
  private isEditMode: boolean
  private isParticipating: boolean
  private canStart: boolean
  private isFull: boolean
  private isClosed: boolean
  private canAddPoule: boolean
  private startDateString: string

  constructor(private competitionService: CompetitionService,
              private participantService: ParticipantService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subs.add(this.authService.user.subscribe(user => {
      this.user = user
      this.subs.add(this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).subscribe(competition => {
        this.competition = competition
        this.subs.add(this.participantService.getParticipants().subscribe(participants => {
          this.participants = participants.filter(participant => (participant.competitionId === this.competition.uid))
          participants.filter(participant => (participant.competitionId === this.competition.uid)).forEach(participant =>{
            this.participants[participant.uid] = participant
          })

          this.setBooleans()
          this.startDateString = this.competition.startDate.toLocaleString()
          this.startDateString = this.startDateString.split("T")[0] + " " + this.startDateString.split("T")[1]
          this.participants.sort((p1, p2) => (p2.points - p1.points))
          if(this.competition.poules){
            this.competition.poules.forEach(poule => {
              poule.participants = this.participants.filter((participant) => (participant.pouleId === poule.uid)).sort((p1, p2) => (p2.points - p1.points))
              poule.rounds = this.competition.rounds.filter((round) => (round.pouleId === poule.uid))
            })
            this.canAddPoule = !((this.participants.length / 2) < (this.competition.poules.length))
          }
          this.canStartCompetition()
        }))
      }))
    }))
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  setBooleans() {
    this.isFull = this.participants.length >= this.competition.maxParticipants
    this.isParticipating = this.participants.filter(participant => (participant.userId === this.user.uid)).length > 0
    this.isOwner = this.user.uid == this.competition.ownerId
    this.isClosed = new Date(this.competition.startDate) < new Date()
  }

  deleteCompetition() {
    if(confirm("Are you sure you want to delete this competition?")){
      this.router.navigate([`/competitions/`]);
      this.participants.forEach(participant => {
        this.participantService.deleteParticipant(participant)
      })
      this.competitionService.deleteCompetition(this.competition)
    }
  }

  canStartCompetition() {
    this.canStart = true
    if(this.competition.poules){
      this.competition.poules.forEach(poule => {
        if(poule.participants.length < 2){
          this.canStart = false
        }
      })
    }
    if(this.competition.type == "knockout" && this.participants.length != this.competition.maxParticipants){
      this.canStart = false
    }
    if(this.participants.length < 2){
      this.canStart = false
    }
  }

  startCompetition() {
    this.competition.hasStarted = true
    this.saveCompetition()
  }

  addRound() {
    this.competition.hasStarted = true
    if(this.competition.type == "poule"){
      this.detailsPouleComponent.addRound()
    }
    else{
      let startDate: Date = new Date(this.competition.startDate)
      let matchTime = this.competition.matchTime.split(":")
      let newMatchTime = new Date(startDate.setTime(startDate.getTime() + ((+matchTime[0] * 3600000) +  (+matchTime[1] * 60000))))
      let matches: Array<Match> = []
      this.participants.forEach((participant1, outer) =>{
        this.participants.forEach((participant2, inner) => {
          if(inner <= outer){
            return
          }
          let match: Match = {
            uid: UUID.UUID(),
            round: 1,
            participantIds: [participant1.uid, participant2.uid],
            startTime: newMatchTime
          }
          matches.push(match)
          newMatchTime = new Date(startDate.setTime(startDate.getTime() + ((+matchTime[0] * 3600000) +  (+matchTime[1] * 60000))))
        })
      })
      const round: Round = {
        matches: matches
      }
      this.competition.rounds.push(round)
    }
    this.saveCompetition()
    this.saveParticipants()
  }

  addParticipantToCompetition(){
    if(this.participants.length >= this.competition.maxParticipants){
      console.log("Max participants reached")
      return
    }
    let data: Array<any> = []

    data["uid"] = UUID.UUID()
    data["name"] = this.user.displayName
    data["userId"] = this.user.uid
    if(this.competition.type == "poule"){
      data["pouleId"] = this.detailsPouleComponent.getPouleWithSpace().uid
    }
    if(this.competition.type == "knockout"){
      this.getMatchWithSpace().participantIds.push(data["uid"])
    }
    this.participantService.createParticipant(data, this.competition.uid)
    this.isParticipating = true
  }
  
  addTestParticipant() {
    if(this.participants.length >= this.competition.maxParticipants){
      console.log("Max participants reached")
      return
    }
    let data: Array<any> = []

    data["uid"] = UUID.UUID()
    data["name"] = "Test Participant " + this.participants.length
    data["userId"] = "-1"
    if(this.competition.type == "poule"){
      data["pouleId"] = this.detailsPouleComponent.getPouleWithSpace().uid
    }
    if(this.competition.type == "knockout"){
      this.getMatchWithSpace().participantIds.push(data["uid"])
    }
    this.participantService.createParticipant(data, this.competition.uid)
    this.saveCompetition()
    this.saveParticipants()
  }

  getMatchWithSpace(): Match {
    let retMatch: Match
    this.competition.rounds[0].matches.forEach(match => {
      if(match.participantIds.length < 2){
        retMatch = match
      }
    })
    return retMatch
  }

  saveCompetition(){
    let canSave = true
    if(this.competition.type == "knockout"){
      this.competition.rounds[0].matches.forEach(match =>{
        if(match.participantIds.length > 2){
          alert("Make sure every match has no more than 2 participants")
          canSave = false
        }
      })
    }
    if(canSave){
      this.competitionService.updateCompetition(this.competition)
      this.setEditMode(false)
    }
  }

  saveParticipants() {
    this.participants.forEach(participant => {
      this.participantService.updateParticipant(participant)
    })
  }

  setEditMode(value: boolean){
    this.isEditMode = value
  }
}
