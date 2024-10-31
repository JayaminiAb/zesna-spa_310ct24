import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PettyCashMainComponent } from './components/petty-cash-main/petty-cash-main.component';
import { PettyCashRoutingModule } from './petty-cash-routing.module';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { FormLayoutDemoRoutingModule } from '../uikit/formlayout/formlayoutdemo-routing.module';
import { ReimbursingComponent } from './components/reimbursing/reimbursing.component';
import { ReportComponent } from './components/report/report.component';
import { TreeTableModule } from 'primeng/treetable';




@NgModule({
  declarations: [
    PettyCashMainComponent,
	ReimbursingComponent,
	ReportComponent
  ],
  imports: [
   
    PettyCashRoutingModule,
    CommonModule,
		FormsModule,
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
export class PettyCashModule { }
