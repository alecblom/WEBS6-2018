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

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  @ViewChild(DetailsPouleComponent) pouleComponent: DetailsPouleComponent
  @ViewChild(DetailsTourneyComponent) tourneyComponent: DetailsTourneyComponent
  @ViewChild(DetailsKnockoutComponent) knockoutComponent: DetailsKnockoutComponent
  
  competition: Competition = undefined
  user: User

  subs = new Subscription()

  private isOwner: boolean
  private isEditMode: boolean
  private isParticipating: boolean
  private isClosed: boolean
  private startDateString: string

  constructor(private competitionService: CompetitionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subs.add(this.authService.user.subscribe(user => {
      this.user = user
      this.subs.add(this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).subscribe(competition => {
          this.competition = competition
          this.isParticipating = this.competition.participants.filter(participant => (participant.userId === user.uid)).length > 0
          this.isOwner = this.user.uid == this.competition.ownerId
          this.isClosed = new Date(this.competition.startDate) < new Date()
          this.startDateString = this.competition.startDate.toLocaleString()
      }))
    }))
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  deleteCompetition() {
    if(confirm("Are you sure you want to delete this competition?")){
      this.router.navigate([`/competitions/`]);
      this.competitionService.deleteCompetition(this.competition)
    }
  }
  addTestParticipant() {
    const index = this.competition.participants.length
    let testParticipant: Participant = {
      uid: UUID.UUID(),
      userId: "-1",
      name: "Test Participant " + index,
      points: 0
    }
    this.competition.participants.push(testParticipant)
  }

  startCompetition(){
    switch(this.competition.type){
      case "poule":
        break
      case "tourney":
        this.tourneyComponent.startCompetition()
        break
      case "knockout":
        break
    }
  }

  addParticipantToCompetition(participant: Participant){
    switch(this.competition.type){
      case "poule":
        this.pouleComponent.addParticipantToCompetition(participant)
        break
      case "tourney":
        this.competition.participants.push(participant)
        this.competitionService.updateCompetition(this.competition)
        this.tourneyComponent.addParticipantToCompetition(participant)
        break
      case "knockout":
        this.competition.participants.push(participant)
        this.competitionService.updateCompetition(this.competition)
        this.knockoutComponent.addParticipantToCompetition(participant)
        break
    }
    this.isParticipating = true
  }

  saveCompetition(){
    switch(this.competition.type){
      case "poule":
        this.pouleComponent.saveCompetition()
        break
      case "tourney":
        this.competitionService.updateCompetition(this.competition)
        break
      case "knockout":
        this.competitionService.updateCompetition(this.competition)
        break
    }
    this.setEditMode(false)
  }

  setEditMode(value: boolean){
    this.isEditMode = value
  }
}
