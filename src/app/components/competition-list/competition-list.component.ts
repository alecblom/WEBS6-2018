import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../core/competition.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.css']
})
export class CompetitionListComponent implements OnInit {

  selectedOption: string;

  options = [
    { name: "Tourney", value: 'tourney' },
    { name: "Knockout", value: 'knockout' },
    { name: "Poule", value: 'poule' },
  ]

  constructor(private competitionService: CompetitionService, private router: Router) { }

  ngOnInit() {
  }

  createCompetition() {
    if (this.selectedOption) {
      this.competitionService.createCompetition(this.selectedOption).then(
        res => {
          this.router.navigate([`/competition/${res}`]);
        }
      )
    }
  }
}
