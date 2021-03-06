import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListComponent } from './list.component';
import { TestMocksModule } from '../../../modules/test/TestMocks.module';
import { Match } from '../../../models/match.model';

describe('ListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ MatchListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    component.matches = Array<Match>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
