import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UUID } from 'angular2-uuid';
import { CompetitionCreateComponent } from './create.component';
import { User } from '../../../models/user.model';
import { TestMocksModule, testUser, testPouleCompetition } from '../../../modules/test/TestMocks.module';
import { Competition } from '../../../models/competition.model';
import { CompetitionService } from '../../../services/competition/competition.service';


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

  it('should create a competition', () => {
    const competitionForm = <NgForm>{
      value: {
        name: 'name',
        startDate: 'Hello',
        type: 'poule',
        ownerId: 'id',
        maxParticipants: '10',
        matchTime: 'World',
        rounds: '12'
      }
    };
    component.user = testUser;
    expect(() => component.createCompetition(competitionForm)).not.toThrow();
  });

  it('should return a data object', () => {
    component.competition = testPouleCompetition;
    component.user = testUser;
    expect(component.generateCreateData()).not.toBeNull();
  });
});

