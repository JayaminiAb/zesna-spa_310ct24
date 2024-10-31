import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PettyCashMainComponent } from './petty-cash-main.component';

describe('PettyCashMainComponent', () => {
  let component: PettyCashMainComponent;
  let fixture: ComponentFixture<PettyCashMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PettyCashMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PettyCashMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
