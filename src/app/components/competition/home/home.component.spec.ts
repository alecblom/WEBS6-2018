import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionHomeComponent } from './home.component';
import { TestMocksModule } from '../../../modules/test/TestMocks.module';
import { CompetitionListComponent } from '../list/list.component';
import { CompetitionCreateComponent } from '../create/create.component';

describe('HomeComponent', () => {
  let component: CompetitionHomeComponent;
  let fixture: ComponentFixture<CompetitionHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ CompetitionHomeComponent,
      CompetitionListComponent,
    CompetitionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
