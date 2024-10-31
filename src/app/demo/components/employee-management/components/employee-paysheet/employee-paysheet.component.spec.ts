import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePaysheetComponent } from './employee-paysheet.component';

describe('EmployeePaysheetComponent', () => {
  let component: EmployeePaysheetComponent;
  let fixture: ComponentFixture<EmployeePaysheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeePaysheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeePaysheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
