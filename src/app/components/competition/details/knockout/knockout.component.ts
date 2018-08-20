import { Component, OnInit, Input } from '@angular/core';
import { CompetitionService } from '../../../../services/competition/competition.service';
import { Competition } from '../../../../models/competition.model';
import { Participant } from '../../../../models/participant.model';
import { ParticipantService } from '../../../../services/participant/participant.service';

@Component({
  selector: 'details-knockout',
  templateUrl: './knockout.component.html',
  styleUrls: ['./knockout.component.scss']
})
export class DetailsKnockoutComponent implements OnInit {

  @Input() competition: Competition

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
  }

  addParticipantToCompetition(participant: any){
  }
}
