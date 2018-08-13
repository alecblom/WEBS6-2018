import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user.model';
import { Competition } from '../../../models/competition.model';
import { DetailsPouleComponent } from './poule/poule.component';
import { DetailsKnockoutComponent } from './knockout/knockout.component';
import { DetailsTourneyComponent } from './tourney/tourney.component';

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {
  @ViewChild(DetailsPouleComponent) pouleComponent: DetailsPouleComponent
  @ViewChild(DetailsTourneyComponent) tourneyComponent: DetailsTourneyComponent
  @ViewChild(DetailsKnockoutComponent) knockoutComponent: DetailsKnockoutComponent
  
  public competition: Competition = undefined
  private user: User
  private isOwner: boolean
  private isParticipating: boolean = false

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).then(competition => {
          this.competition = competition
          if(this.competition.participants.includes(this.user))
            this.isParticipating = true
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
        this.tourneyComponent.addParticipantToCompetition(participant)
        break
      case "knockout":
        this.knockoutComponent.addParticipantToCompetition(participant)
        break
    }
    this.isParticipating = true
  }
}