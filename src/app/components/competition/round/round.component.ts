import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Round } from '../../../models/round.model';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'round-list',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() rounds: Array<Round>
  @Output() onWinnerSelect = new EventEmitter<any>()

  selectedRound: Round

  constructor() { }

  ngOnInit() {
    if(this.rounds.length > 0){
      this.selectedRound = this.rounds[0]
    }
  }

  saveCompetition() {
    console.log("round")
    this.onWinnerSelect.emit()
  }

  setSelectedRound(round: Round) {
    this.selectedRound = round
  }

}
