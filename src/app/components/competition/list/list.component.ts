import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../../services/competition/competition.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Competition } from '../../../models/competition.model';

@Component({
  selector: 'competition-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class CompetitionListComponent implements OnInit {

  competitions: Array<Competition> = [];

  constructor(private competitionService: CompetitionService, private router: Router) { }

  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(
      collection => {
        this.competitions = collection
      }
    );
  }
}
