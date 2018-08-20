import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Match } from '../../../../../models/match.model';
import { Participant } from '../../../../../models/participant.model';
import { ParticipantService } from '../../../../../services/participant/participant.service';

@Component({
  selector: 'knockout-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class KnockoutMatchComponent implements OnInit {

  @Input() match: Match
  @Input() matchNumber: any
  @Output() onWinnerSelect = new EventEmitter<any>()

  participants: Array<Participant> = []

  constructor(private participantService: ParticipantService) { }

  ngOnInit() {
    this.match.participantIds.forEach((id, index) =>{
      this.participantService.getParticipant(id).subscribe(participant => {
        this.participants[index] = participant
      })
    })
  }

}
