import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsKnockoutComponent } from './knockout.component';
import { TestMocksModule, testKnockoutCompetition } from '../../../../modules/test/TestMocks.module';
import { MatchComponent } from '../../round/match/match.component';
import { KnockoutMatchComponent } from './match/match.component';
import { DragulaModule } from 'ng2-dragula';

describe('DetailsKnockoutComponent', () => {
  let component: DetailsKnockoutComponent;
  let fixture: ComponentFixture<DetailsKnockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestMocksModule, DragulaModule ],
      declarations: [ DetailsKnockoutComponent,
      KnockoutMatchComponent,
    MatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsKnockoutComponent);
    component = fixture.componentInstance;
    component.competition = testKnockoutCompetition;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
