import { TestBed } from '@angular/core/testing';

import { GetUserByUsernameService } from './get-user-by-username.service';

describe('GetUserByUsernameService', () => {
  let service: GetUserByUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserByUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
