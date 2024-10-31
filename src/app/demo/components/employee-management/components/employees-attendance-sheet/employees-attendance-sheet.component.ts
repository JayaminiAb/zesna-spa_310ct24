import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { attendanceStatuses, EmployeeAttendance, employeeAttendanceData, EmployeeDetails } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter } from 'src/app/demo/core/filter';
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
    SortCol: 'Name',
    DatesWithin: []
  }
  attendanceStatuses  = attendanceStatuses;
  employeesAttendance: EmployeeAttendance[] = employeeAttendanceData;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  selectedDate: Date = new Date();
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  constructor(
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService
  ) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
  }
  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          
        }
      }
    );
  }

 
  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    this.getEmployeeListAttendance();
  }

  getEmployeeListAttendance() {
    this.zesnaEmployeeModel.GetAllEmployeeAttendance(this.selectedEstate.Id).then(
      (data) => {
        this.employeesAttendance = <EmployeeAttendance[]>data;
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
}
