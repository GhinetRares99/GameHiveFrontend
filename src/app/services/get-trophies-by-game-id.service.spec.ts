import { TestBed } from '@angular/core/testing';

import { GetTrophiesByGameIdService } from './get-trophies-by-game-id.service';

describe('GetTrophiesByGameIdService', () => {
  let service: GetTrophiesByGameIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrophiesByGameIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
