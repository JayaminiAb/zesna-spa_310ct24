import { Component } from '@angular/core';
import { InvoiceData } from '../../core/invoice';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoices-list',
  templateUrl: './invoices-list.component.html',
  styleUrl: './invoices-list.component.scss'
})
export class InvoicesListComponent {
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
  overallCookieInterface: OverallCookies;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;

  estateList: EstateDetails[] = [];
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };

  constructor(private _zesnaCommonService: ZesnaCommonService, private router: Router) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);

    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();

  }
  ngOnDestroy() {
    // Unsubscribe all

    this.zesnaEstateModel.UnsubscribeAll();

  }

  ngOnInit(): void {

    this.getEstateListByUserId();



  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getInvoiceListPG();
        }
      }
    );
  }
  addNewInvoice() {
    this.router.navigate(['main/inventory/invoice_crud', 0]);
  }
  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.getInvoiceListPG();
  }
  getInvoiceListPG() {

  }
  getTotalAmount(invoice: InvoiceData): number {
    // Calculate subtotal as the sum of quantity * unitPrice for each item
    const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

    // Calculate discount amount
    const discountAmount = (invoice.discount / 100) * subtotal;

    // Calculate total as subtotal minus discount
    const total = subtotal - discountAmount;

    return total;
  }

  viewInvoice(invoice: InvoiceData) {
    // Implement view functionality
    this.router.navigate(['main/inventory/invoice_crud', invoice.id]);
  }

  editInvoice(invoice: InvoiceData) {
    // Implement edit functionality
    this.router.navigate(['main/inventory/invoice_crud', invoice.id]);
  }

  deleteInvoice(invoice: InvoiceData) {
    // Implement delete functionality
    console.log('Deleting invoice:', invoice);
  }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
