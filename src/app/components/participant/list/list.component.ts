import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'participant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ParticipantListComponent implements OnInit {

  @Input() participants: Array<any>;

  constructor() { }

  ngOnInit() {
    
    this.participants.forEach(p => {
      console.log(p)
    })
  }

}
