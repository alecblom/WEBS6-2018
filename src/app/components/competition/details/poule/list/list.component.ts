import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../../../models/user.model';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'poule-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PouleListComponent implements OnInit {

  @Input() poules: Array<any>
  @Input() isEditMode: boolean

  constructor(private dragulaService: DragulaService) { }

  ngOnInit() {
    let group = this.dragulaService.find("'poule'")
    if(group == undefined){
      group = this.dragulaService.createGroup("'poule'", {
        moves: (el) => !el.classList.contains('no-drag')
      })
      console.log(group)
    }
    else{
      console.log(group)
      group.options = {
        moves: (el) => !el.classList.contains('no-drag')
      }
    }
  }

}
