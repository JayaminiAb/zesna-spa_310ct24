import { TestBed } from '@angular/core/testing';

import { ZesnaCommonService } from './zesna-common.service';

describe('ZesnaCommonService', () => {
  let service: ZesnaCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
