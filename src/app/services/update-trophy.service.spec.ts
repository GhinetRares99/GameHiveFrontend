import { TestBed } from '@angular/core/testing';

import { UpdateTrophyService } from './update-trophy.service';

describe('UpdateTrophyService', () => {
  let service: UpdateTrophyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTrophyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
