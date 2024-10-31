import { TestBed } from '@angular/core/testing';

import { ZesnaTransportService } from './zesna-transport.service';

describe('ZesnaTransportService', () => {
  let service: ZesnaTransportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaTransportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
