import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'poule-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class PouleListComponent implements OnInit {

  @Input() poules: Array<any>

  constructor() { }

  ngOnInit() {
  }

}
