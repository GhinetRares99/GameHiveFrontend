import { TestBed } from '@angular/core/testing';

import { GetTrophyByNameService } from './get-trophy-by-name.service';

describe('GetTrophyByNameService', () => {
  let service: GetTrophyByNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrophyByNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
