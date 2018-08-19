import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPouleComponent } from './detailsPoule.component';
import { TestMocksModule } from '../../../../modules/test/TestMocks.module';

describe('PouleComponent', () => {
  let component: DetailsPouleComponent;
  let fixture: ComponentFixture<DetailsPouleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ DetailsPouleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPouleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
