import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../models/user.model';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { PouleCompetition } from '../../../../models/poulecompetition.model';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'details-poule',
  templateUrl: './detailsPoule.component.html',
  styleUrls: ['./detailsPoule.component.scss']
})
export class DetailsPouleComponent implements OnInit {

  public user: User;
  private subs = new Subscription();
  private isOwner: boolean
  private isEditMode: boolean
  private canAddPoule: boolean

  @Input() competition: PouleCompetition;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.user = user
      this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).subscribe(competition => {
          this.competition = competition
          this.setBooleans()
      });
    })
  }

  setBooleans(){
    if(this.user.uid == this.competition.ownerId){
      this.isOwner = true
    }
    else{
      this.isOwner = false
    }
    if((this.competition.participants.length / 2) < (this.competition.poules.length + 1)){
      this.canAddPoule = false
    }
    else{
      this.canAddPoule = true
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  saveCompetition(){
    this.competitionService.updateCompetition(this.competition)
    this.setEditMode(false)
  }

  setEditMode(value: boolean){
    this.isEditMode = value
  }

  addParticipantToCompetition(participant: any){
    let index = 0
    let hasSpace = false;
    var poule;
    while(!hasSpace){
      if(index == this.competition.poules.length){
        poule = this.addPoule();
      }
      else{
        poule = this.competition.poules[index]
      }
      if(poule.participants.length > 3){
        index++
      }
      else{
        hasSpace = true;
      }
    }
    poule.participants.push(participant)
    this.competition.participants.push(participant)
  }

  addPoule(): any{
    if((this.competition.participants.length / 2) < (this.competition.poules.length + 1)){
      // TODO: error message or replace button in html
      console.log("Need more participants to add another poule")
      return;
    }
    var pouleNumber = this.competition.poules.length + 1
    var poule = {
      name: "Poule " + pouleNumber,
      participants: []
    }
    this.competition.poules.push(poule)
    return poule;
  }

}
