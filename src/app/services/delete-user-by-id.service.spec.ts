import { TestBed } from '@angular/core/testing';

import { DeleteUserByIdService } from './delete-user-by-id.service';

describe('DeleteUserByIdService', () => {
  let service: DeleteUserByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteUserByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
