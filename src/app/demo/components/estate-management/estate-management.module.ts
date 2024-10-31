import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstateMainComponent } from './components/estate-main/estate-main.component';
import { EstateManagementRoutingModule } from './estate-management-routing.module';
import { SidebarModule } from 'primeng/sidebar';
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
import { DropdownModule } from 'primeng/dropdown';
import { EstateManagementComponent } from './components/estate-management/estate-management.component';



@NgModule({
  declarations: [
    EstateMainComponent,
	EstateManagementComponent
  ],
  imports: [
    CommonModule,
    EstateManagementRoutingModule,
    SidebarModule,
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
		TableModule
  ]
})
export class EstateManagementModule { }
