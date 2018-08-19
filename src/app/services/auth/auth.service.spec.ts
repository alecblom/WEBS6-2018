import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { TestMocksModule } from '../../modules/test/TestMocks.module';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
