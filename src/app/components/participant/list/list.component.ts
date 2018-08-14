import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'participant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  @Input() participants: Array<User>;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}