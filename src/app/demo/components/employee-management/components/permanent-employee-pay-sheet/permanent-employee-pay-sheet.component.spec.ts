import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanentEmployeePaySheetComponent } from './permanent-employee-pay-sheet.component';

describe('PermanentEmployeePaySheetComponent', () => {
  let component: PermanentEmployeePaySheetComponent;
  let fixture: ComponentFixture<PermanentEmployeePaySheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermanentEmployeePaySheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PermanentEmployeePaySheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
