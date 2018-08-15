import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { UserService } from '../../../services/user/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { Competition } from '../../../models/competition.model';
import { DetailsPouleComponent } from './poule/detailsPoule.component';
import { DetailsKnockoutComponent } from './knockout/knockout.component';
import { DetailsTourneyComponent } from './tourney/tourney.component';
import { ParticipantListComponent } from '../../participant/list/list.component';

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class CompetitionDetailsComponent implements OnInit {
  @ViewChild(DetailsPouleComponent) pouleComponent: DetailsPouleComponent
  @ViewChild(DetailsTourneyComponent) tourneyComponent: DetailsTourneyComponent
  @ViewChild(DetailsKnockoutComponent) knockoutComponent: DetailsKnockoutComponent
  
  public competition: Competition = undefined
  private user: User
  private isOwner: boolean
  private isEditMode: boolean
  private isParticipating: boolean

  constructor(private competitionService: CompetitionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).subscribe(competition => {
          this.competition = competition
          if(this.competition.participants.filter(participant => (participant.uid === user.uid)).length > 0){
            this.isParticipating = true
          }
          else{
            this.isParticipating = false
          }
          if(this.user.uid == this.competition.ownerId){
            this.isOwner = true
          }
          else{
            this.isOwner = false
          }
      });
    })
  }

  addParticipantToCompetition(participant: User){
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
