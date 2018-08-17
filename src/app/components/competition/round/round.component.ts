import { Component, OnInit, Input } from '@angular/core';
import { Round } from '../../../models/round.model';

@Component({
  selector: 'round-list',
  templateUrl: './round.component.html',
  styleUrls: ['./round.component.scss']
})
export class RoundComponent implements OnInit {

  @Input() rounds: Array<Round>

  selectedRound: Round

  constructor() { }

  ngOnInit() {
    if(this.rounds.length > 1){
      this.selectedRound = this.rounds[0]
    }
  }

  setSelectedRound(round: Round) {
    this.selectedRound = round
  }

}
