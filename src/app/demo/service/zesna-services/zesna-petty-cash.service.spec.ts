import { TestBed } from '@angular/core/testing';

import { ZesnaPettyCashService } from './zesna-petty-cash.service';

describe('ZesnaPettyCashService', () => {
  let service: ZesnaPettyCashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaPettyCashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
