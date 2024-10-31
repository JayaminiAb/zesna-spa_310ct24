import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstateMainComponent } from './estate-main.component';

describe('EstateMainComponent', () => {
  let component: EstateMainComponent;
  let fixture: ComponentFixture<EstateMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstateMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstateMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
