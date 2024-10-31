import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransportMainComponent } from './components/transport-main/transport-main.component';
import { TransportReportComponent } from './components/transport-report/transport-report.component';
import { TransportRoutingModule } from './transport-routing.module';
import { TransportReportListComponent } from './components/transport-report-list/transport-report-list.component';
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
import { SidebarModule } from 'primeng/sidebar';




@NgModule({
  declarations: [
    TransportMainComponent,
    TransportReportComponent,
    TransportReportListComponent
  ],
  imports: [
    CommonModule,
    TransportRoutingModule,
    
		FormsModule,
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
		TreeTableModule,
		SidebarModule
  ]
})
export class TransportModule { }
