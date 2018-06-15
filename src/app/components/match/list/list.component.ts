import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'match-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MatchListComponent implements OnInit {

  matches: Array<any>

  constructor() { }

  ngOnInit() {
  }

}