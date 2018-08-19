import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { Competition } from '../../../models/competition.model';
import { DetailsPouleComponent } from './poule/detailsPoule.component';
import { DetailsKnockoutComponent } from './knockout/knockout.component';
import { DetailsTourneyComponent } from './tourney/tourney.component';
import { ParticipantListComponent } from '../../participant/list/list.component';
import { Subscription } from 'rxjs';
import { Participant } from '../../../models/participant.model';
import { Form } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { ParticipantService } from '../../../services/participant/participant.service';
import { Match } from '../../../models/match.model';
import { RoundComponent } from '../round/round.component';

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
  private isClosed: boolean
  private startDateString: string

  constructor(private competitionService: CompetitionService,
              private userService: UserService,
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
          this.isParticipating = this.participants.filter(participant => (participant.userId === this.user.uid)).length > 0
          this.isOwner = this.user.uid == this.competition.ownerId
          this.isClosed = new Date(this.competition.startDate) < new Date()
          this.startDateString = this.competition.startDate.toLocaleString()
          this.participants.sort((p1, p2) => (p2.points - p1.points))
          this.competition.poules.forEach(poule => {
            poule.participants = this.participants.filter((participant) => (participant.pouleId === poule.uid)).sort((p1, p2) => (p2.points - p1.points))
          })
        }))
      }))
    }))
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
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
  addTestParticipant() {
    let data: Array<any> = []

    data["uid"] = UUID.UUID()
    data["name"] = "Test Participant " + this.participants.length
    data["userId"] = "-1"
    if(this.competition.type == "poule"){
      data["pouleId"] = this.detailsPouleComponent.getPouleWithSpace().uid
    }
    this.participantService.createParticipant(data, this.competition.uid)
    this.saveCompetition()
  }

  addRound(){
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
    Competition.addRound(this.competition, matches)
    this.saveCompetition()
  }

  addParticipantToCompetition(){
    let data: Array<any> = []

    data["uid"] = UUID.UUID()
    data["name"] = this.user.displayName
    data["userId"] = this.user.uid
    if(this.competition.type == "poule"){
      data["pouleId"] = this.detailsPouleComponent.getPouleWithSpace().uid
    }
    this.participantService.createParticipant(data, this.competition.uid)
    this.isParticipating = true
  }

  saveCompetition(){
    this.participants.forEach(participant => {
      this.participantService.updateParticipant(participant)
    })
    this.competitionService.updateCompetition(this.competition)
    this.setEditMode(false)
  }

  setEditMode(value: boolean){
    this.isEditMode = value
  }
}
