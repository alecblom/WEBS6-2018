import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { TestMocksModule } from '../../modules/test/TestMocks.module';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestMocksModule],
      providers: [UserService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
