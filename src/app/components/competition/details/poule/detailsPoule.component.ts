import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { Subscription } from 'rxjs';
import { Poule } from '../../../../models/poule.model';
import { UUID } from 'angular2-uuid';
import { Participant } from '../../../../models/participant.model';
import { DragulaService, DragulaModule } from 'ng2-dragula';
import { ParticipantService } from '../../../../services/participant/participant.service';
import { Competition } from '../../../../models/competition.model';
import { Match } from '../../../../models/match.model';
import { Round } from '../../../../models/round.model';

@Component({
  selector: 'details-poule',
  templateUrl: './detailsPoule.component.html',
  styleUrls: ['./detailsPoule.component.scss']
})
export class DetailsPouleComponent implements OnInit {

  subs = new Subscription();
  
  @Input() canAddPoule: boolean
  @Input() isOwner: boolean
  @Input() isEditMode: boolean
  @Input() competition: Competition;
  @Input() participants: Array<Participant>
  @Output() onSaveCompetition = new EventEmitter<any>()

  constructor(
    private competitionService: CompetitionService,
    private participantService: ParticipantService,
    private dragulaService: DragulaService
  ) { }

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

    this.dragulaService.dropModel("'poule'").subscribe(({el, item}) => {
      item.pouleId = el.parentElement.id
      this.participantService.updateParticipant(item)
    })

    this.competition.poules.forEach(poule => {
      poule.participants = this.participants.filter((participant) => (participant.pouleId === poule.uid)).sort((p1, p2) => (p2.points - p1.points))
    })
    this.canAddPoule = !((this.participants.length / 2) < (this.competition.poules.length))
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addRound() {
    let startDate: Date = new Date(this.competition.startDate)
    let matchTime = this.competition.matchTime.split(":")
    let newMatchTime = new Date(startDate.setTime(startDate.getTime() + ((+matchTime[0] * 3600000) +  (+matchTime[1] * 60000))))

    this.competition.poules.forEach(poule => {
      let matches: Array<Match> = []
      poule.participants.forEach((participant1, outer) => {
        poule.participants.forEach((participant2, inner) => {
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
        matches: matches,
        pouleId: poule.uid
      }
      this.competition.rounds.push(round)
    })

  }

  saveCompetition() {
    this.onSaveCompetition.emit()
  }

  getPouleWithSpace(): Poule {
    let index = 0
    let hasSpace = false;
    let poule: Poule;
    while(!hasSpace){
      if(index == this.competition.poules.length){
        poule = this.addPoule();
      }
      else{
        poule = this.competition.poules[index]
      }
      if(poule.participants && poule.participants.length > 2){
        index++
      }
      else{
        hasSpace = true;
      }
    }
    return poule;
  }

  addPoule(): Poule{
    this.canAddPoule = ((this.participants.length / 2) > (this.competition.poules.length))
    if(!this.canAddPoule){
      console.log("Need more participants to add another poule")
      return;
    }
    var poule: Poule = {
      uid: UUID.UUID(),
      participants: []
    }
    this.competition.poules.push(poule)
    this.canAddPoule = ((this.participants.length / 2) > (this.competition.poules.length))
    return poule;
  }

  deletePoule(index: number) {
    if (index > -1) {
      this.competition.poules.splice(index, 1);
      this.canAddPoule = ((this.participants.length / 2) > (this.competition.poules.length))
    }
  }

}
