import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePrinterPreviewComponent } from './invoice-printer-preview.component';

describe('InvoicePrinterPreviewComponent', () => {
  let component: InvoicePrinterPreviewComponent;
  let fixture: ComponentFixture<InvoicePrinterPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicePrinterPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvoicePrinterPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
