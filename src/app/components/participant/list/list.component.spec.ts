import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantListComponent } from './list.component';
import { TestMocksModule } from '../../../modules/test/TestMocks.module';
import { Participant } from '../../../models/participant.model';

describe('ListComponent', () => {
  let component: ParticipantListComponent;
  let fixture: ComponentFixture<ParticipantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      declarations: [ ParticipantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantListComponent);
    component = fixture.componentInstance;
    component.participants = Array<Participant>();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
