import { Component, OnInit, Input } from '@angular/core';
import { Participant } from '../../../models/participant.model';

@Component({
  selector: 'participant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  @Input() participants: Array<Participant>;

  constructor() { }

  ngOnInit() {

  }


}