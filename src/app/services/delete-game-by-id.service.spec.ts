import { TestBed } from '@angular/core/testing';

import { DeleteGameByIdService } from './delete-game-by-id.service';

describe('DeleteGameByIdService', () => {
  let service: DeleteGameByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteGameByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
