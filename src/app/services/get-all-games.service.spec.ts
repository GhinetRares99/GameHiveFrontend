import { TestBed } from '@angular/core/testing';

import { GetAllGamesService } from './get-all-games.service';

describe('GetAllGamesService', () => {
  let service: GetAllGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
