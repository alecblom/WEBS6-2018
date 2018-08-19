import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CompetitionCreateComponent } from './create.component';
import { User } from '../../../models/user.model';
import { TestMocksModule, testUser } from '../../../modules/test/TestMocks.module';


describe('CreateComponent', () => {
  let component: CompetitionCreateComponent;
  let fixture: ComponentFixture<CompetitionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TestMocksModule ],
      declarations: [ CompetitionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create a competition', () => {
  //   const competitionForm = <NgForm>{
  //     value: {
  //       name: 'name',
  //       startDate: 'Hello',
  //       type: 'poule',
  //       ownerId: 'id',
  //       maxParticipants: '10',
  //       matchTime: 'World',
  //       rounds: '12'
  //     }
  //   };

  //   component.user = testUser;
  //   component.createCompetition(competitionForm);
  //   expect(component.competition.uid).toBe(testUser.uid);
  // });
});

