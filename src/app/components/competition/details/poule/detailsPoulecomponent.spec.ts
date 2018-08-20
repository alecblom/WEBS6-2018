import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPouleComponent } from './detailsPoule.component';
import { TestMocksModule, testPouleCompetition, testPoule, testParticipantA, testParticipantB } from '../../../../modules/test/TestMocks.module';
import { RoundComponent } from '../../round/round.component';
import { DragulaModule } from 'ng2-dragula';
import { MatchComponent } from '../../round/match/match.component';
import { Participant } from '../../../../models/participant.model';

describe('PouleComponent', () => {
  let component: DetailsPouleComponent;
  let fixture: ComponentFixture<DetailsPouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule, DragulaModule],
      declarations: [ DetailsPouleComponent, RoundComponent, MatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPouleComponent);
    component = fixture.componentInstance;
    component.competition = testPouleCompetition;
    component.participants = Array<Participant>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not add a round to a poule competition without participants', () => {
    component.competition = testPouleCompetition;
    component.addRound();
    expect(component.competition.rounds.length).toBe(testPouleCompetition.rounds.length);
  });

  // it('should add a round to a poule competition with 2 participants', () => {
  //   component.competition = testPouleCompetition;
  //   component.participants.push(testParticipantA);
  //   component.participants.push(testParticipantB);
  //   component.addRound();
  //   expect(component.competition.rounds.length).toBe(testPouleCompetition.rounds.length);
  // });

  it('should save a poule competition', () => {
    component.competition = testPouleCompetition;
    expect(() => component.saveCompetition()).not.toThrow();
  });

  it('should return a poule with free space', () => {
    component.competition = testPouleCompetition;
    component.competition.poules.push(testPoule);
    const poule = component.getPouleWithSpace();
    expect(poule).not.toBeNull();
  });

  it('should add a poule to a poule competition with 2 participants', () => {
    component.competition = testPouleCompetition;
    component.participants.push(testParticipantA);
    component.participants.push(testParticipantB);
    const poule = component.addPoule();
    expect(poule).not.toBeNull();
  });
});
