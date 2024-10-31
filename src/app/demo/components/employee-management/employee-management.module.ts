import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { EmployeeManagementRoutingModule } from './employee-management-routing.module';
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
import { FullCalendarModule } from '@fullcalendar/angular';
import { EmployeeAttendanceComponent } from './components/employee-attendance/employee-attendance.component';
import { SidebarModule } from 'primeng/sidebar';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeePaysheetComponent } from './components/employee-paysheet/employee-paysheet.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { EmployeesAttendanceSheetComponent } from './components/employees-attendance-sheet/employees-attendance-sheet.component';


@NgModule({
  declarations: [
    EmployeeMainComponent,
    EmployeeAttendanceComponent,
	EmployeeManagementComponent,
	EmployeePaysheetComponent,
	EmployeesAttendanceSheetComponent
  ],
  imports: [
    CommonModule,
    EmployeeManagementRoutingModule,
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
    FullCalendarModule,
	SidebarModule,
	OverlayPanelModule 

  ]
})
export class EmployeeManagementModule { }
