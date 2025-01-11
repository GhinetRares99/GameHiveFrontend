import { TestBed } from '@angular/core/testing';

import { GetGameByNameService } from './get-game-by-name.service';

describe('GetGameByNameService', () => {
  let service: GetGameByNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetGameByNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
