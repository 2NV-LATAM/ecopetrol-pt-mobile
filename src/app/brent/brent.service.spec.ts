import { TestBed } from '@angular/core/testing';

import { BrentService } from './brent.service';

describe('BrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BrentService = TestBed.get(BrentService);
    expect(service).toBeTruthy();
  });
});
