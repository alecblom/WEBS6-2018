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

  winnerSelect(round: Round, match: Match, participantId: string) {
    if(this.competition.rounds[match.round]){
      round.matches.forEach((outerMatch, i) =>{
        if(match == outerMatch){
          this.competition.rounds[match.round].matches.forEach((innerMatch, j) =>{
            if((i == 0 || i == 1) && j == 0) {
              innerMatch.participantIds.push(participantId)
            }
            if((i == 2 || i == 3) && j == 1) {
              innerMatch.participantIds.push(participantId)
            }
            if((i == 4 || i == 5) && j == 2) {
              innerMatch.participantIds.push(participantId)
            }
            if((i == 6 || i == 7) && j == 3) {
              innerMatch.participantIds.push(participantId)
            }
          })
        }
      })
    }
    match.winnerId = participantId
    this.competitionService.updateCompetition(this.competition)
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
