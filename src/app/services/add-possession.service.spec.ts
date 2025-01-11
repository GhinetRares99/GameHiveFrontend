import { TestBed } from '@angular/core/testing';

import { AddPossessionService } from './add-possession.service';

describe('AddPossessionService', () => {
  let service: AddPossessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPossessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
