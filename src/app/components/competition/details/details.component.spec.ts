import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionDetailsComponent } from './details.component';
import { TestMocksModule } from '../../../modules/test/TestMocks.module';
import { ParticipantListComponent } from '../../participant/list/list.component';
import { DetailsTourneyComponent } from './tourney/tourney.component';
import { DetailsKnockoutComponent } from './knockout/knockout.component';
import { DetailsPouleComponent } from './poule/detailsPoule.component';
import { RoundComponent } from '../round/round.component';

describe('CompetitionDetailsComponent', () => {
  let component: CompetitionDetailsComponent;
  let fixture: ComponentFixture<CompetitionDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [
        CompetitionDetailsComponent,
        ParticipantListComponent,
        DetailsTourneyComponent,
        DetailsKnockoutComponent,
        DetailsPouleComponent,
        RoundComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
