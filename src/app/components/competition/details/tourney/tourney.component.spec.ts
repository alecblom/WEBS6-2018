import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTourneyComponent } from './tourney.component';
import { TestMocksModule } from '../../../../modules/test/TestMocks.module';
import { RoundComponent } from '../../round/round.component';
import { MatchComponent } from '../../round/match/match.component';

describe('DetailsTourneyComponent', () => {
  let component: DetailsTourneyComponent;
  let fixture: ComponentFixture<DetailsTourneyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ DetailsTourneyComponent,
      RoundComponent,
    MatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTourneyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
