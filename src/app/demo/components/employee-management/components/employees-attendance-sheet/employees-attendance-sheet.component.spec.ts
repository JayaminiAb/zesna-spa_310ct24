import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesAttendanceSheetComponent } from './employees-attendance-sheet.component';

describe('EmployeesAttendanceSheetComponent', () => {
  let component: EmployeesAttendanceSheetComponent;
  let fixture: ComponentFixture<EmployeesAttendanceSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeesAttendanceSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeesAttendanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
