import { Component } from '@angular/core';
import { Company } from '../../../petty_cash/core/petty-cash';
import { Employee, employees, newEmployee } from '../../core/employee';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { EmployeeAttendanceComponent } from '../employee-attendance/employee-attendance.component';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter } from 'src/app/demo/core/filter';
import { EmployeeDetails } from 'src/app/demo/core/employee/employee-details';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrl: './employee-management.component.scss',
  providers: [DialogService, MessageService]
})
export class EmployeeManagementComponent {
  ref: DynamicDialogRef | undefined;
 
  employees: EmployeeDetails[] = [];

  selectedEmployee: EmployeeDetails = {
    Id: 0,
    Fullname: "",
    Email: "",
    Phone: "",
    Salary: 0.0,
    OTRate: 0.0,
    JoinDate: new Date(),
    EmployeeRoleDetails: {
        Id: 0,
        Name: ""
    },
    Address: {
        HouseNo: "",
        Street: "",
        City: "",
        PostalCode: ""
    },
    Total: 0
  };
 
  
  newEmployee : Employee = this.deep(newEmployee);
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
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  constructor(public dialogService: DialogService, public messageService: MessageService,
     private _zesnaCommonService: ZesnaCommonService,
     private _zesnaEmployeeService: ZesnaEmployeeService
    ){
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
  }

  ngOnInit(): void {

  }

getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEmployeeList();
        }
      }
    );
  }

  onEmployeeSelect(employee: EmployeeDetails){
    this.selectedEmployee = employee;
    this.showEmployeeAttendance(employee);
  }
  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.zesnaEmployeeModel.GetAllEmployeeInfoDetailsWithPG(this.filter, this.selectedEstate.Id).then(
      (data) => {
        this.employees = <EmployeeDetails[]>data;
      }
    );
  }

  getEmployeeById() {
    this.zesnaEmployeeModel.GetEmployeeInfoDetailsById( this.selectedEmployee.Id).then(
      (data) => {
        this.selectedEmployee = <EmployeeDetails>data;
      }
    );
  }

  showEmployeeAttendance(employee: EmployeeDetails){
    this.ref = this.dialogService.open(EmployeeAttendanceComponent, {
      header: 'View Attendance',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: employee
  });

  this.ref.onClose.subscribe((event: any) => {
      if (event) {
          
      }
  });
  }


  displayEmployeeSlider: boolean = false;
  editingEmployee: boolean = false;




  
  addNewEmployee(): void {
    this.displayEmployeeSlider = true;
    this.editingEmployee = false;
    this.newEmployee = this.deep(newEmployee);
  }

  hideEmployeeSlider(): void {
    this.displayEmployeeSlider = false;
  }

  saveEmployee(type: string): void {
    this.zesnaEmployeeModel.SetlEmployeeInfoDetails( this.selectedEmployee, this.selectedEstate.Id, type).then(
      (data) => {
        this.selectedEmployee = <EmployeeDetails>data;
      }
    );
    this.hideEmployeeSlider();
  }

  viewEmployee(employee: EmployeeDetails): void {
    this.editingEmployee = false;
    this.selectedEmployee = employee;
    
    this.displayEmployeeSlider = true;
  }

  editEmployee(employee: Employee): void {
    this.editingEmployee = true;
    this.newEmployee = { ...employee };
    this.displayEmployeeSlider = true;
  }

  deleteEmployee(employee: EmployeeDetails): void {
    this.zesnaEmployeeModel.SetlEmployeeInfoDetails( employee, this.selectedEstate.Id, 'REMOVE').then(
      (data) => {
        
      }
    );
    this.hideEmployeeSlider();
  }
   // Making a deep copy
   deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}



