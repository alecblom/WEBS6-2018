import { Component, OnInit, Input } from '@angular/core';
import { Match } from '../../../../models/match.model';

@Component({
  selector: 'match-details',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  @Input() match: Match

  constructor() { }

  ngOnInit() {
  }

}
