import { TestBed } from '@angular/core/testing';

import { MsgBoxService } from './msg-box.service';

describe('MsgBoxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsgBoxService = TestBed.get(MsgBoxService);
    expect(service).toBeTruthy();
  });
});
