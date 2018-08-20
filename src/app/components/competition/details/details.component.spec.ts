import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionDetailsComponent } from './details.component';
import { TestMocksModule, testParticipantA, testParticipantB, testKnockoutCompetition, testPouleCompetition, testTourneyCompetition, testUser } from '../../../modules/test/TestMocks.module';
import { ParticipantListComponent } from '../../participant/list/list.component';
import { DetailsTourneyComponent } from './tourney/tourney.component';
import { DetailsKnockoutComponent } from './knockout/knockout.component';
import { DetailsPouleComponent } from './poule/detailsPoule.component';
import { RoundComponent } from '../round/round.component';
import { DragulaModule } from 'ng2-dragula';
import { MatchComponent } from '../round/match/match.component';
import { Participant } from '../../../models/participant.model';
import { KnockoutCompetition } from '../../../models/knockoutcompetition.model';
import { KnockoutMatchComponent } from './knockout/match/match.component';

describe('CompetitionDetailsComponent', () => {
  let component: CompetitionDetailsComponent;
  let fixture: ComponentFixture<CompetitionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule, DragulaModule],
      declarations: [
        CompetitionDetailsComponent,
        ParticipantListComponent,
        DetailsTourneyComponent,
        DetailsKnockoutComponent,
        DetailsPouleComponent,
        RoundComponent,
        MatchComponent,
        KnockoutMatchComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailsComponent);
    component = fixture.componentInstance;
    component.participants = Array<Participant>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add the booleans without throwing', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    testUser.uid = testParticipantA.uid;
    component.user = testUser;
    expect(() => component.setBooleans()).not.toThrow();
  });

  it('should delete the competition without throwing', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    expect(() => component.deleteCompetition()).not.toThrow();
  });

  it('should save the competition without throwing', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    expect(() => component.saveCompetition()).not.toThrow();
  });

  it('should save the participants without throwing', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    expect(() => component.saveParticipants()).not.toThrow();
  });

  it('should be able to start the competition without throwing', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    expect(() => component.canStartCompetition()).not.toThrow();
  });

  it('should not add a round to a tourney competition without participants', () => {
    component.competition = testTourneyCompetition;
    component.addRound();
    expect(component.competition.rounds.length).toBe(testTourneyCompetition.rounds.length);
  });

  it('should not add a round to a knockout competition without participants', () => {
    component.competition = testKnockoutCompetition;
    component.addRound();
    expect(component.competition.rounds.length).toBe(testKnockoutCompetition.rounds.length);
  });
});
