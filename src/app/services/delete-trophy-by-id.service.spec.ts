import { TestBed } from '@angular/core/testing';

import { DeleteTrophyByIdService } from './delete-trophy-by-id.service';

describe('DeleteTrophyByIdService', () => {
  let service: DeleteTrophyByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteTrophyByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
