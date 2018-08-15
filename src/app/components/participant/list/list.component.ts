import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/user.model';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';

@Component({
  selector: 'participant-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ParticipantListComponent implements OnInit {

  @Input() participants: Array<User>;
  @Input() name: string;
  @Input() canEdit: boolean

  subs = new Subscription()

  constructor(private dragulaService: DragulaService) { }

  ngOnInit() {
      let group = this.dragulaService.find(this.name)
      if(group == undefined){
        group = this.dragulaService.createGroup(this.name, {
          moves: (el) => !el.classList.contains('no-drag')
        })
      }
      else{
        group.options = {
          moves: (el) => !el.classList.contains('no-drag')
        }
      }
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

}