import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportMainComponent } from './transport-main.component';

describe('TransportMainComponent', () => {
  let component: TransportMainComponent;
  let fixture: ComponentFixture<TransportMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransportMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransportMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
