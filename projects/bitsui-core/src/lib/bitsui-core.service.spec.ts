import { TestBed } from '@angular/core/testing';

import { BitsuiCoreService } from './bitsui-core.service';

describe('BitsuiCoreService', () => {
  let service: BitsuiCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BitsuiCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
