import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';

@Component({
  selector: 'participant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ParticipantListComponent implements OnInit {

  @Input() participants: Array<User>;

  constructor() { }

  ngOnInit() {
    
    this.participants.forEach(p => {
      
    })
  }

}
