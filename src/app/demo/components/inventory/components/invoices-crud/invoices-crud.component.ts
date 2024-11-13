import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { InvoicePreviewComponent } from '../invoice-preview/invoice-preview.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceData } from '../../core/invoice';

@Component({
  selector: 'app-invoices-crud',
  templateUrl: './invoices-crud.component.html',
  styleUrl: './invoices-crud.component.scss',
  providers: [DialogService, MessageService]
})
export class InvoicesCrudComponent {
  ref: DynamicDialogRef | undefined;
  invoiceData: InvoiceData = {
    id: 0,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: '',
    clientContact: '',
    clientAddress: '',
    invoiceNumber: '',
    companyPhone1: '0770072522',
    companyPhone2: '0710522522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Select Supplier', value: null },
    supplierTemp: '',
    invoiceDate: new Date(),
    discount: 0,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
    
    ],
 
  };
  supplierList: SelectItem[] = [
    { label: 'Select Supplier', value: null },  // Placeholder for dropdown
    { label: 'Supplier A', value: { code: 'SUP001', name: 'Supplier A' } },
    { label: 'Supplier B', value: { code: 'SUP002', name: 'Supplier B' } },
    { label: 'Supplier C', value: { code: 'SUP003', name: 'Supplier C' } },
    { label: 'Supplier D', value: { code: 'SUP004', name: 'Supplier D' } },
    { label: 'Supplier E', value: { code: 'SUP005', name: 'Supplier E' } }
];
invoices: InvoiceData[] = [
  {
    id: 1,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: 'Client A',
    clientContact: '0771234567',
    clientAddress: 'Client Address 1',
    invoiceNumber: 'INV-001',
    companyPhone1: '0710522522',
    companyPhone2: '0770072522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Supplier A', value: { code: 'SUP001', name: 'Supplier A' } },
    invoiceDate: new Date(),
    discount: 50,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
      { description: 'Item 1', quantity: 2, unitPrice: 100, total: 200 },
      { description: 'Item 2', quantity: 1, unitPrice: 150, total: 150 },
    ]
  },
  {
    id: 2,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: 'Client B',
    clientContact: '0779876543',
    clientAddress: 'Client Address 2',
    invoiceNumber: 'INV-002',
    companyPhone1: '0710522522',
    companyPhone2: '0770072522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Supplier B', value: { code: 'SUP002', name: 'Supplier B' } },
    invoiceDate: new Date(),
    discount: 30,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
      { description: 'Item 1', quantity: 3, unitPrice: 90, total: 270 },
      { description: 'Item 3', quantity: 2, unitPrice: 120, total: 240 },
    ]
  },
  {
    id: 3,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: 'Client C',
    clientContact: '0751122334',
    clientAddress: 'Client Address 3',
    invoiceNumber: 'INV-003',
    companyPhone1: '0710522522',
    companyPhone2: '0770072522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Supplier C', value: { code: 'SUP003', name: 'Supplier C' } },
    invoiceDate: new Date(),
    discount: 20,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
      { description: 'Item 4', quantity: 5, unitPrice: 70, total: 350 },
      { description: 'Item 2', quantity: 1, unitPrice: 150, total: 150 },
    ]
  },
  {
    id: 4,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: 'Client D',
    clientContact: '0782233445',
    clientAddress: 'Client Address 4',
    invoiceNumber: 'INV-004',
    companyPhone1: '0710522522',
    companyPhone2: '0770072522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Supplier D', value: { code: 'SUP004', name: 'Supplier D' } },
    invoiceDate: new Date(),
    discount: 15,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
      { description: 'Item 1', quantity: 4, unitPrice: 85, total: 340 },
      { description: 'Item 5', quantity: 3, unitPrice: 110, total: 330 },
    ]
  },
  {
    id: 5,
    companyName: 'Zesna Agro Farm (PVT)LTD',
    companyAddress1: 'No.316, Barrier Junction, Girandurukotte',
    companyAddress2: 'No.120, Palugaswewa, Weheragala, Thanamalwila',
    clientName: 'Client E',
    clientContact: '0775566778',
    clientAddress: 'Client Address 5',
    invoiceNumber: 'INV-005',
    companyPhone1: '0710522522',
    companyPhone2: '0770072522',
    companyEmail: 'zesnaagro@gmail.com',
    companyWeb: 'www.zesnaagro.com',
    supplier: { label: 'Supplier E', value: { code: 'SUP005', name: 'Supplier E' } },
    invoiceDate: new Date(),
    discount: 40,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
    items: [
      { description: 'Item 3', quantity: 6, unitPrice: 75, total: 450 },
      { description: 'Item 6', quantity: 2, unitPrice: 140, total: 280 },
    ]
  },
  // More invoices up to 10
];
constructor(public dialogService: DialogService,  private router: Router,
  private route: ActivatedRoute,){}
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      const contactId = params['invoiceId'];
      if (contactId) {
        this.invoiceData.id = +contactId;
        if(this.invoiceData.id > 0){
          
          this.getInvoiceDetails();
        }
       
      }

     
    });
  }

  goBack(){
     // Implement edit functionality
     this.router.navigate(['main/inventory/invoice_list']);
  }
  getInvoiceDetails(){
    debugger
    this.invoiceData = this.invoices.find(item => item.id === this.invoiceData.id);
  }
  addItem() {
    this.invoiceData.items.push({ description: '', quantity: 1, unitPrice: 0, total: 0 });
  }

  removeItem(index: number) {
    this.invoiceData.items.splice(index, 1);
  }

  updateItemTotal(index: number) {
    const item = this.invoiceData.items[index];
    item.total = item.quantity * item.unitPrice;
  }

  saveInvoice() {
    console.log('Invoice Data:', this.invoiceData);
    // Additional logic to save the invoice data can be added here
  }

  savePrint(){
    this.ref = this.dialogService.open(InvoicePreviewComponent, {
      header: 'Print Invoice',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: this.invoiceData
    });

    this.ref.onClose.subscribe((event: any) => {
     
      if (event) {

      }
    });
  }
}
