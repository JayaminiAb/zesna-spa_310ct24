import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmployeeMainComponent } from './components/employee-main/employee-main.component';
import { EmployeeManagementComponent } from './components/employee-management/employee-management.component';
import { EmployeePaysheetComponent } from './components/employee-paysheet/employee-paysheet.component';
import { EmployeesAttendanceSheetComponent } from './components/employees-attendance-sheet/employees-attendance-sheet.component';
import { TemporaryEmployeePaySheetComponent } from './components/temporary-employee-pay-sheet/temporary-employee-pay-sheet.component';
import { PermanentEmployeePaySheetComponent } from './components/permanent-employee-pay-sheet/permanent-employee-pay-sheet.component';
import { EmployeePaysheetMainComponent } from './components/employee-paysheet-main/employee-paysheet-main.component';
import { CompanyHolidaysComponent } from './components/company-holidays/company-holidays.component';


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: EmployeeMainComponent , children: [
            { path: '',  redirectTo: 'pay_sheet_main', pathMatch: 'full' },
            { path: 'pay_sheet_main',  component: EmployeePaysheetMainComponent, children: [
                { path: 'temp_emp_pay_sheet/:estateId',  component: TemporaryEmployeePaySheetComponent },
                { path: 'per_emp_pay_sheet/:estateId',  component: PermanentEmployeePaySheetComponent },
               
            ] },
            { path: 'pay_sheet',  component: EmployeePaysheetComponent },
            { path: 'manage',  component: EmployeeManagementComponent },
            { path: 'attendance',  component: EmployeesAttendanceSheetComponent },
            { path: 'holidays',  component: CompanyHolidaysComponent },
        ]},
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EmployeeManagementRoutingModule { }
