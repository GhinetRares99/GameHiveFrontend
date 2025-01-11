import { TestBed } from '@angular/core/testing';

import { GetAllTrophiesService } from './get-all-trophies.service';

describe('GetAllTrophiesService', () => {
  let service: GetAllTrophiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTrophiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
