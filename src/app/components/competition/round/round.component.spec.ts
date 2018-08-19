import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoundComponent } from './round.component';
import { TestMocksModule } from '../../../modules/test/TestMocks.module';
import { MatchComponent } from './match/match.component';

describe('RoundComponent', () => {
  let component: RoundComponent;
  let fixture: ComponentFixture<RoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ RoundComponent,
      MatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
