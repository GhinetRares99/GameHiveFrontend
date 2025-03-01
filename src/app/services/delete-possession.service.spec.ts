import { TestBed } from '@angular/core/testing';

import { DeletePossessionService } from './delete-possession.service';

describe('DeletePossessionService', () => {
  let service: DeletePossessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePossessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
