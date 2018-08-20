import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchComponent } from './match.component';
import { TestMocksModule, testMatch } from '../../../../modules/test/TestMocks.module';

describe('MatchComponent', () => {
  let component: MatchComponent;
  let fixture: ComponentFixture<MatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ MatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchComponent);
    component = fixture.componentInstance;
    component.match = testMatch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
