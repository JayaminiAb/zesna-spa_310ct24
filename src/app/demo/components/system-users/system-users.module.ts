import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemUsersRoutingModule } from './system-user-routing.module';
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
import { UserMainComponent } from './components/user-main/user-main.component';



@NgModule({
  declarations: [
    UserMainComponent
  ],
  imports: [
    CommonModule,
    SystemUsersRoutingModule,
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
export class SystemUsersModule { }
