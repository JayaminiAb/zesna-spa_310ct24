import { TestBed } from '@angular/core/testing';

import { ZesnaLoginService } from './zesna-login.service';

describe('ZesnaLoginService', () => {
  let service: ZesnaLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
