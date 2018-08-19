import { TestBed, inject } from '@angular/core/testing';

import { CompetitionService } from './competition.service';
import { TestMocksModule } from '../../modules/test/TestMocks.module';

describe('CompetitionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      providers: [CompetitionService]
    });
  });

  it('should be created', inject([CompetitionService], (service: CompetitionService) => {
    expect(service).toBeTruthy();
  }));
});
