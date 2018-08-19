import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsKnockoutComponent } from './knockout.component';
import { TestMocksModule } from '../../../../modules/test/TestMocks.module';

describe('DetailsKnockoutComponent', () => {
  let component: DetailsKnockoutComponent;
  let fixture: ComponentFixture<DetailsKnockoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestMocksModule ],
      declarations: [ DetailsKnockoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsKnockoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
