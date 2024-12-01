import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemporaryEmployeePaySheetComponent } from './temporary-employee-pay-sheet.component';

describe('TemporaryEmployeePaySheetComponent', () => {
  let component: TemporaryEmployeePaySheetComponent;
  let fixture: ComponentFixture<TemporaryEmployeePaySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemporaryEmployeePaySheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemporaryEmployeePaySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
