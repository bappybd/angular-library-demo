import { TestBed } from '@angular/core/testing';

import { BitsuiBaseService } from './bitsui-base.service';

describe('BitsuiBaseService', () => {
  let service: BitsuiBaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitsuiBaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
