import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPouleComponent } from './detailsPoule.component';
import { TestMocksModule, testCompetition } from '../../../../modules/test/TestMocks.module';
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
    component.competition = testCompetition;
    component.participants = Array<Participant>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
