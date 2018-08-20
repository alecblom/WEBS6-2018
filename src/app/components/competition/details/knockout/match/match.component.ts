import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../../../../../models/match.model';
import { Participant } from '../../../../../models/participant.model';
import { ParticipantService } from '../../../../../services/participant/participant.service';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'knockout-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class KnockoutMatchComponent implements OnInit {

  @Input() isEditMode: boolean
  @Input() match: Match
  @Input() matchNumber: any
  @Output() onWinnerSelect = new EventEmitter<any>()

  participants: Array<Participant> = []

  constructor(private participantService: ParticipantService, private dragulaService: DragulaService) { }

  ngOnInit() {

  }

}
