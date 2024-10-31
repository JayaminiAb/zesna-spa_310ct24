import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateManagementComponent } from './estate-management.component';

describe('EstateManagementComponent', () => {
  let component: EstateManagementComponent;
  let fixture: ComponentFixture<EstateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
