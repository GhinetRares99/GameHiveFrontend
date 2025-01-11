import { TestBed } from '@angular/core/testing';

import { AddTrophyService } from './add-trophy.service';

describe('AddTrophyService', () => {
  let service: AddTrophyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTrophyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
