import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { attendanceStatuses, EmployeeAttendance, employeeAttendanceData, EmployeeDetails } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter, TransportFilter } from 'src/app/demo/core/filter';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';

@Component({
  selector: 'app-employees-attendance-sheet',
  templateUrl: './employees-attendance-sheet.component.html',
  styleUrl: './employees-attendance-sheet.component.scss'
})
export class EmployeesAttendanceSheetComponent {
  editing = true;
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
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name'
  }
  attendanceStatuses = attendanceStatuses;
  employeesAttendance: EmployeeAttendance[] = employeeAttendanceData;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  selectedDate: Date = new Date();
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  // Store the cookie interface
  overallCookieInterface: OverallCookies;

  constructor(
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService
  ) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }

  ngOnInit() {
    this.getEstateListByUserId();
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEmployeeListAttendance();
        }
      }
    );
  }


  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    //this.selectedEstate = event;
    this.getEmployeeListAttendance();
  }

  getEmployeeListAttendance() {
    let transportFilter: TransportFilter = {
      EndDate: new Date,
      EstateId: this.selectedEstate.Id,
      StartDate: this.selectedDate,
      TransportedItem: '',
      VehicleNumber: ''
    };
    this.zesnaEmployeeModel.GetAllEmployeeAttendance(transportFilter).then(
      (data) => {
        this.employeesAttendance = <EmployeeAttendance[]>data;
        this.employeesAttendance.forEach(item => {
          item.OnTime = new Date(item.OnTime);
          item.OffTime = new Date(item.OffTime);
        });
      }
    );
  }
  onDateRangeChange(event: any) {
    // Filter petty cash history based on selected date range
    console.log(event)
  }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }

  updateEmployeeAttendance(employee: EmployeeAttendance) {
    employee.AddedDate = this.selectedDate;
    employee.OnTime = new Date(new Date(employee.OnTime.getTime() + employee.OnTime.getTimezoneOffset() * 60000).getTime() - 3600000);
    employee.OffTime = new Date(new Date(employee.OffTime.getTime() + employee.OffTime.getTimezoneOffset() * 60000).getTime() - 3600000);

    this.zesnaEmployeeModel.SetEmployeeAttendanceReport(employee, this.selectedEstate.Id).then(
      (data) => {
        this.getEmployeeListAttendance();
      }
    );
  }

  onChangeAttendanceStatus(employee: EmployeeAttendance) {
    this.updateEmployeeAttendance(employee);
  }

  onChangeComment(employee: EmployeeAttendance) {
    debugger
    this.updateEmployeeAttendance(employee);
  }

  clickCallBack(event: any) {

  }
}
