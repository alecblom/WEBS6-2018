import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AuthGuard } from '../../core/auth.guard';
import { Router } from '@angular/router';
import { CompetitionService } from '../../services/competition/competition.service';
import { Competition } from '../../models/competition.model';
import { User } from '../../models/user.model';
import { ParticipantService } from '../../services/participant/participant.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  competitions: Array<Competition> = [];
  user: User;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private auth: AuthService,
    private competitionService: CompetitionService,
    private router: Router,
    private participantService: ParticipantService) { }

  ngOnInit() {
    this.competitionService.getCompetitions().subscribe(
      collection => {
        let competitionIds: Array<Competition> = []
        // this.competitions = collection;

        this.auth.user.subscribe(
          user => {
            this.user = user;
            this.participantService.getParticipants().subscribe(participants => {
              participants.filter(participant => (participant.userId === user.uid)).forEach(participant => {
                competitionIds.push(participant.competitionId)
              })
              this.competitions = collection.filter(
                competition => (
                  competitionIds.filter(competitionId => (competitionId === competition.uid)).length > 0
                )
              );
            })
          }
        );
      }
    );
  }

}
