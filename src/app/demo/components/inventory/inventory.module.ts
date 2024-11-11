import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesListComponent } from './components/invoices-list/invoices-list.component';
import { InvoicesComponent } from './components/invoices/invoices.component';
import { InvoicesCrudComponent } from './components/invoices-crud/invoices-crud.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InvoicePreviewComponent } from './components/invoice-preview/invoice-preview.component';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { FormLayoutDemoRoutingModule } from '../uikit/formlayout/formlayoutdemo-routing.module';



@NgModule({
  declarations: [
    InvoicesListComponent,
    InvoicesComponent,
    InvoicePreviewComponent,
    InvoicesCrudComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InventoryRoutingModule,
		FormLayoutDemoRoutingModule,
		AutoCompleteModule,
		CalendarModule,
		ChipsModule,
		DropdownModule,
		InputMaskModule,
		InputNumberModule,
		CascadeSelectModule,
		MultiSelectModule,
		InputTextareaModule,
		InputTextModule,
		TableModule,
		TreeTableModule
  ]
})
export class InventoryModule { }
