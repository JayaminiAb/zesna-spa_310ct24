import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesCrudComponent } from './invoices-crud.component';

describe('InvoicesCrudComponent', () => {
  let component: InvoicesCrudComponent;
  let fixture: ComponentFixture<InvoicesCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicesCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicesCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
