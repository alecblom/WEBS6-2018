import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Competition } from '../../../../models/competition.model';
import { Participant } from '../../../../models/participant.model';
import { CompetitionService } from '../../../../services/competition/competition.service';

@Component({
  selector: 'details-tourney',
  templateUrl: './tourney.component.html',
  styleUrls: ['./tourney.component.scss']
})
export class DetailsTourneyComponent implements OnInit {

  @Input() competition: Competition
  @Input() participants: Array<Participant>
  @Output() onSaveCompetition = new EventEmitter<any>()

  constructor(private competitionService: CompetitionService) {

   }

  ngOnInit() {
  }

  addParticipantToCompetition(participant: Participant){
    console.log("tourney add")
  }

  saveCompetition() {
    this.onSaveCompetition.emit()
  }
}