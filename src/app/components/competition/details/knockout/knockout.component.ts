import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../../services/competition/competition.service';

@Component({
  selector: 'details-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class DetailsKnockoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addParticipantToCompetition(participant: any){
    console.log("knockout add")
  }
}
