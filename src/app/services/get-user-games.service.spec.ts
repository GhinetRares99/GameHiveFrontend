import { TestBed } from '@angular/core/testing';

import { GetUserGamesService } from './get-user-games.service';

describe('GetUserGamesService', () => {
  let service: GetUserGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetUserGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
