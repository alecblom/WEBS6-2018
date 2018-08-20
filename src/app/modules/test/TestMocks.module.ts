import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { ActivatedRoute, Params } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { DragulaModule , DragulaService} from 'ng2-dragula';
import { environment } from '../../../environments/environment';

// Models
import { User } from '../../models/user.model';
import { UUID } from 'angular2-uuid';
import { Match } from '../../models/match.model';
import { Competition } from '../../models/competition.model';
import { Round } from '../../models/round.model';

// Services
import { AuthService } from '../../services/auth/auth.service';
import { CompetitionService } from '../../services/competition/competition.service';
import { MatchService } from '../../services/match/match.service';
import { ParticipantService } from '../../services/participant/participant.service';
import { UserService } from '../../services/user/user.service';
import { Poule } from '../../models/poule.model';
import { Participant } from '../../models/participant.model';

export const testUser: User = {
    'uid': UUID.UUID(),
    'displayName': 'Test Participant',
    'email': ''
};

export const testMatch: Match = {
  'uid': UUID.UUID(),
  'participantIds': ['1'],
  'round': 2,
  'startTime': new Date(),
};

export const testTourneyCompetition: Competition = {
  'uid': UUID.UUID(),
  'rounds': Array<Round>(),
  'startDate': new Date(),
  'type': 'tourney',
  'ownerId': '2',
  'name': 'test',
  'maxParticipants': 10,
  'matchTime': '2',
  'poules': Array<Poule>(),
  'hasStarted': false
};

export const testPouleCompetition: Competition = {
  'uid': UUID.UUID(),
  'rounds': Array<Round>(),
  'startDate': new Date(),
  'type': 'poule',
  'ownerId': '2',
  'name': 'test',
  'maxParticipants': 10,
  'matchTime': '2',
  'poules': Array<Poule>(),
  'hasStarted': false
};

export const testKnockoutCompetition: Competition = {
  'uid': UUID.UUID(),
  'rounds': Array<Round>(),
  'startDate': new Date(),
  'type': 'knockout',
  'ownerId': '2',
  'name': 'test',
  'maxParticipants': 10,
  'matchTime': '2',
  'poules': Array<Poule>(),
  'hasStarted': false
};

export const testPoule: Poule = {
  'uid': UUID.UUID(),
  'participants': Array<Participant>(),
  'rounds': Array<Round>()
};

export const testParticipantA: Participant = {
  'uid': UUID.UUID(),
  'competitionId': '',
  'points': 0,
  'userId': '',
  'name': 'testA',
};

export const testParticipantB: Participant = {
  'uid': UUID.UUID(),
  'competitionId': '',
  'points': 0,
  'userId': '',
  'name': 'testB',
};

@NgModule({
  declarations: [

  ],
  imports: [
    HttpModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DragulaModule
  ],
  providers: [
    AuthService,
    CompetitionService,
    MatchService,
    HttpModule,
    FormsModule,
    ParticipantService,
    UserService,
    DragulaService,
    AngularFirestore,
    AngularFireAuth
  ],
  exports: [
    HttpModule,
    FormsModule,
    RouterTestingModule
  ],
})
export class TestMocksModule { }
