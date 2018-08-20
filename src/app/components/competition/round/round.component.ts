import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Round } from '../../../models/round.model';

@Component({
  selector: 'round-list',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() rounds: Array<Round>
  @Input() isOwner: boolean
  @Output() onWinnerSelect = new EventEmitter<any>()

  selectedRound: Round

  constructor() { }

  ngOnInit() {
    if(this.rounds.length > 0){
      this.selectedRound = this.rounds[0]
    }
  }

  saveCompetition() {
    this.onWinnerSelect.emit()
  }

  setSelectedRound(round: Round) {
    this.selectedRound = round
  }

}
