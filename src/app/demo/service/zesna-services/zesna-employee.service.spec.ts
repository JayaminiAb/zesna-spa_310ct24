import { TestBed } from '@angular/core/testing';

import { ZesnaEmployeeService } from './zesna-employee.service';

describe('ZesnaEmployeeService', () => {
  let service: ZesnaEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZesnaEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
