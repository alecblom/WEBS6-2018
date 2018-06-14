import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'competition-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class CompetitionDetailsComponent implements OnInit {

  public competition: any = undefined;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.competitionService.getCompetition(this.route.snapshot.paramMap.get('id')).then(
      res => this.competition = res
    );
  }
}
