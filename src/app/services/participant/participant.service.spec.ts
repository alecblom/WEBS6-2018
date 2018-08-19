import { TestBed, inject } from '@angular/core/testing';

import { ParticipantService } from './participant.service';
import { TestMocksModule } from '../../modules/test/TestMocks.module';

describe('ParticipantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      providers: [ParticipantService]
    });
  });

  it('should be created', inject([ParticipantService], (service: ParticipantService) => {
    expect(service).toBeTruthy();
  }));
});
