import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { PouleCompetition } from '../../../../models/poulecompetition.model';
import { Subscription } from 'rxjs';
import { Poule } from '../../../../models/poule.model';
import { UUID } from 'angular2-uuid';
import { Participant } from '../../../../models/participant.model';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'details-poule',
  templateUrl: './detailsPoule.component.html',
  styleUrls: ['./detailsPoule.component.scss']
})
export class DetailsPouleComponent implements OnInit {

  subs = new Subscription();
  
  private canAddPoule: boolean

  @Input() isOwner: boolean
  @Input() isEditMode: boolean
  @Input() competition: PouleCompetition;


  constructor(private competitionService: CompetitionService, private dragulaService: DragulaService) { }

  ngOnInit() {
    let group = this.dragulaService.find("'poule'")
    if(group == undefined){
      group = this.dragulaService.createGroup("'poule'", {
        moves: (el) => !el.classList.contains('no-drag')
      })
    }
    else{
      group.options = {
        moves: (el) => !el.classList.contains('no-drag')
      }
    }
    this.canAddPoule = !((this.competition.participants.length / 2) < (this.competition.poules.length + 1))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  saveCompetition(){
    this.competitionService.updateCompetition(this.competition)
  }

  setEditMode(value: boolean){
    this.isEditMode = value
  }

  addParticipantToCompetition(participant: Participant){
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
    this.competitionService.updateCompetition(this.competition)
  }

  addPoule(): Poule{
    if(!this.canAddPoule){
      console.log("Need more participants to add another poule")
      return;
    }
    var poule: Poule = {
      uid: UUID.UUID(),
      participants: []
    }
    this.competition.poules.push(poule)
    return poule;
  }

  deletePoule(index: number) {
    if (index > -1) {
      this.competition.poules.splice(index, 1);
   }
  }

}
