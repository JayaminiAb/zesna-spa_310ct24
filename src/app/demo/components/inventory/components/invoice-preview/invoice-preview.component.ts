import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
  total: number;
}

@Component({
  selector: 'app-invoice-preview',
  templateUrl: './invoice-preview.component.html',
  styleUrl: './invoice-preview.component.scss'
})
export class InvoicePreviewComponent {
  invoiceData: any;
   logoPath: 'assets/layout/images/logo/with_company_name-01.jpg'
   constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    if (JSON.stringify(this.config.data)) {
      this.invoiceData = this.config.data;

    }
  }
  getTotalDisCount(): number{
    return (this.invoiceData.items.reduce((sum, item) => sum + item.total, 0) * this.invoiceData.discount)/100;
  }

  getTotalAmount(): number {
    return this.getSubTotalAmount() - this.getTotalDisCount();
  }
  getSubTotalAmount(): number{
    return this.invoiceData.items.reduce((sum, item) => sum + item.total, 0);
  }

  generatePDF() {
    const DATA = document.getElementById('invoice')!;
    html2canvas(DATA, { scale: 2 }).then(canvas => {
      const imgWidth = 208;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 1, 1, imgWidth, imgHeight);
      pdf.save(`Invoice_${this.invoiceData.invoiceNumber}.pdf`);
    });
    this.ref.close(true);
  }
}
