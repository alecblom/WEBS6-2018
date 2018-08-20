import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnockoutMatchComponent } from './match.component';
import { TestMocksModule, testMatch } from '../../../../../modules/test/TestMocks.module';
import { DragulaModule } from 'ng2-dragula';

describe('KnockoutMatchComponent', () => {
  let component: KnockoutMatchComponent;
  let fixture: ComponentFixture<KnockoutMatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestMocksModule, DragulaModule ],
      declarations: [ KnockoutMatchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnockoutMatchComponent);
    component = fixture.componentInstance;
    component.match = testMatch;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
