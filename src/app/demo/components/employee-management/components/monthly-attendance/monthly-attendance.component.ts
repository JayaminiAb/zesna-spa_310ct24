import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { attendanceStatuses, EmployeeAttendance } from 'src/app/demo/core/employee/employee-details';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';
import { Employee } from '../../core/employee';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';

@Component({
  selector: 'app-monthly-attendance',
  templateUrl: './monthly-attendance.component.html',
  styleUrl: './monthly-attendance.component.scss'
})
export class MonthlyAttendanceComponent {
  employeeAttendance: EmployeeAttendance[] = []; // Array to hold attendance data
  zesnaEmployeeModel: ZesnaEmployeeModel;
  selectedEmployee: Employee;
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  currentYear: number = 2024;
  currentMonth: number = 11;
  estateId: number = 0;
  selectedDate: Date = new Date();
  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig,
    private _zesnaEmployeeService: ZesnaEmployeeService
  ) {
    if (JSON.stringify(this.config.data)) {
      this.selectedEmployee = <Employee>this.config.data['employee'];
      this.estateId = this.config.data['estateId'];
      console.log(this.selectedEmployee)
      this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
      this.overallCookieInterface = new OverallCookieModel();
      this.loggedUserId = +this.overallCookieInterface.GetUserId();
      this.loggedUserRole = this.overallCookieInterface.GetUserRole();
    }

    //this.calendarOptions = { initialView: 'dayGridMonth', datesSet: this.onDatesSet.bind(this), };
  }

  ngOnInit() {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear(); // Get the current year
    this.currentMonth = currentDate.getMonth()+1; // Get the current month (0-based index)
    // Getting all the events
    this.getAllEvents();
  }

  onDateRangeChange(event: any) {
    // Filter petty cash history based on selected date range
    this.currentYear = this.selectedDate.getFullYear(); // Get the current year
    this.currentMonth = this.selectedDate.getMonth()+1; // Get the current month (0-based index)
    // Getting all the events
     // Getting all the events
     this.getAllEvents();
  }
   // Getting all the events
   getAllEvents() {
    this.zesnaEmployeeModel.GetEmployeeAttendanceReportForMonth(this.selectedEmployee.Id, this.currentYear, this.currentMonth, this.estateId).then(
      (data: EmployeeAttendance[]) => {
        // Transform tasks into FullCalendar events with date ranges and additional properties
        
        this.employeeAttendance = data;
        
      }
    );
  }
  getAttendanceStatus(code: string){
    return attendanceStatuses.find(item => item.value == code).label;

  }
}
