import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursingComponent } from './reimbursing.component';

describe('ReimbursingComponent', () => {
  let component: ReimbursingComponent;
  let fixture: ComponentFixture<ReimbursingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReimbursingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReimbursingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
