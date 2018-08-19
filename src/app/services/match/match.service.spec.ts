import { TestBed, inject } from '@angular/core/testing';

import { MatchService } from './match.service';
import { TestMocksModule } from '../../modules/test/TestMocks.module';

describe('MatchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      providers: [MatchService]
    });
  });

  it('should be created', inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
