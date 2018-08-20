import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { Competition } from '../../../../models/competition.model';
import { Participant } from '../../../../models/participant.model';
import { ParticipantService } from '../../../../services/participant/participant.service';
import { DragulaService } from 'ng2-dragula';
import { Round } from '../../../../models/round.model';
import { Match } from '../../../../models/match.model';

@Component({
  selector: 'details-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class DetailsKnockoutComponent implements OnInit {

  @Input() competition: Competition
  @Input() isEditMode: boolean
  @Input() participants: Array<Participant>
  @Output() onMatchChanged = new EventEmitter<any>()

  constructor(private participantService: ParticipantService, private dragulaService: DragulaService, private competitionService: CompetitionService) { }

  ngOnInit() {
    let group = this.dragulaService.find("'knockoutmatch"+ (this.competition.rounds.length -1) + "'")
    if(group == undefined){
      group = this.dragulaService.createGroup("'knockoutmatch"+ (this.competition.rounds.length -1) + "'", {
        moves: (el) => !el.classList.contains('no-drag')
      })
    }
    else{
      group.options = {
        moves: (el) => !el.classList.contains('no-drag')
      }
    }
  }

  getParticipantById(uid: string): Participant {
    let retParticipant: Participant
    this.participants.forEach(participant => {
      if(participant.uid == uid){
        return retParticipant = participant
      }
    })
    return retParticipant
  }

  addParticipantToCompetition(participant: any){
  }
}
