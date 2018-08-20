import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../models/match.model';

@Component({
  selector: 'match-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class MatchListComponent implements OnInit {

  @Input() matches: Array<Match>;

  constructor() { }

  ngOnInit() {
  }
}
