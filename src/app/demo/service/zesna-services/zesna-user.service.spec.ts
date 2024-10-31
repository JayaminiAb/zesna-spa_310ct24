import { TestBed } from '@angular/core/testing';

import { ZesnaUserService } from './zesna-user.service';

describe('ZesnaUserService', () => {
  let service: ZesnaUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
