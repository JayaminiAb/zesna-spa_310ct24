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
import { InputSwitchModule } from 'primeng/inputswitch';
import { MonthlyAttendanceComponent } from './components/monthly-attendance/monthly-attendance.component';
import { TabViewModule } from 'primeng/tabview';
import { CheckboxModule } from 'primeng/checkbox';
import { EmployeePaysheetMainComponent } from './components/employee-paysheet-main/employee-paysheet-main.component';
import { TemporaryEmployeePaySheetComponent } from './components/temporary-employee-pay-sheet/temporary-employee-pay-sheet.component';
import { PermanentEmployeePaySheetComponent } from './components/permanent-employee-pay-sheet/permanent-employee-pay-sheet.component';
import { CompanyHolidaysComponent } from './components/company-holidays/company-holidays.component';
@NgModule({
  declarations: [
    EmployeeMainComponent,
    EmployeeAttendanceComponent,
	EmployeeManagementComponent,
	EmployeePaysheetComponent,
	EmployeesAttendanceSheetComponent,
	MonthlyAttendanceComponent,
	EmployeePaysheetMainComponent,
	TemporaryEmployeePaySheetComponent,
	PermanentEmployeePaySheetComponent,
	CompanyHolidaysComponent
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
	OverlayPanelModule,
	InputSwitchModule,
	TabViewModule,
	CheckboxModule
	
	

  ]
})
export class EmployeeManagementModule { }
