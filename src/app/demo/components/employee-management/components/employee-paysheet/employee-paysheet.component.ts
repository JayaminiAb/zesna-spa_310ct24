import { Component } from '@angular/core';
import { Company, CompanyDetails } from '../../../petty_cash/core/petty-cash';
import { Employee, EmployeePayment, employeePayments, newPayment } from '../../core/employee';


import { EmployeeAttendanceComponent } from '../employee-attendance/employee-attendance.component';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter, TransportFilter } from 'src/app/demo/core/filter';
import { EmployeeDetails, EmployeePaySheet, PaymentObject } from 'src/app/demo/core/employee/employee-details';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';

@Component({
  selector: 'app-employee-paysheet',
  templateUrl: './employee-paysheet.component.html',
  styleUrl: './employee-paysheet.component.scss',
  providers: [DialogService, MessageService]
})

export class EmployeePaysheetComponent {
  selectedDate: Date = new Date();
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  employees: EmployeeDetails[] = [];




  employeePayments: EmployeePaySheet[] = [];
  newPayment: EmployeePaySheet = {
    Id: 0,
    EmployeeId: 0,
    EmployeeDisplayId: '',
    EmployeeDuty: '',
    EmployeeName: '',
    EmployeeOTRate: 0,
    EmployeeSalary: 0,
    OnTime: new Date(), // Default time format as a string
    OffTime: new Date(),
    OtHours: 0,
    OtPayment: 0
  };

  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
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

  selectedEmployee: EmployeeDetails = {
    Id: 0,
    Fullname: "",
    Email: "",
    Phone: "",
    Salary: 0.0,
    OTRate: 0.0,
    JoinDate: new Date(),
    Duty: "",
    Address: {
      HouseNo: "",
      Street: "",
      City: "",
      PostalCode: ""
    },
    Total: 0
  };
  transportFilter: TransportFilter = { EstateId: 0, TransportedItem: "", VehicleNumber: "", StartDate: new Date(), EndDate: new Date() }
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  constructor(public dialogService: DialogService, public messageService: MessageService,
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService
  ) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }
  ngOnInit(): void {
    this.getEstateListByUserId();
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEmployeePaySheet();
        }
      }
    );
  }

  onEmployeeSelect(employee: EmployeeDetails) {
    this.selectedEmployee = employee;

  }

  getEmployeePaySheet() {
    this.transportFilter.EstateId = this.selectedEstate.Id;
    this.transportFilter.StartDate = this.selectedDate;

    this.zesnaEmployeeModel.GetEmployeePaySheet(this.transportFilter).then(
      (data) => {
        this.employeePayments = <EmployeePaySheet[]>data;
        this.employeePayments.forEach(item => {
          item.OnTime = new Date(item.OnTime);
          item.OffTime = new Date(item.OffTime);
        });
      }
    );
  }

  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company

    this.getEmployeePaySheet();
  }
  getEmployeeList() {
    this.zesnaEmployeeModel.GetAllEmployeeInfoDetailsWithPG(this.filter, this.selectedEstate.Id).then(
      (data) => {
        this.employees = <EmployeeDetails[]>data;
      }
    );
  }

  removeItem(payment: EmployeePaySheet) {
    // this.zesnaEmployeeModel.SetEmployeePaySheet(payment, this.selectedDate, this.selectedEstate.Id, 'REMOVE').then(
    //   (data) => {

    //   }
    // );
  }
  onDateRangeChange(event: any) {
    this.getEmployeePaySheet();
  }

  clickCallBack(event: any) { }

  displayEmployeeSlider: boolean = false;
  editingEmployee: boolean = false;





  addNewPayment() {
   
    //this.employeePayments.push(this.deep(this.newPayment))
    // this.zesnaEmployeeModel.SetEmployeePaySheet(this.newPayment, this.selectedDate, this.selectedEstate.Id, 'INSERT').then(
    //   (data) => {
    //     this.getEmployeePaySheet();
    //   }
    // );
  }

  getTotalAmount() {
    let totalAmount = 0;
    this.employeePayments.forEach(element => {
      totalAmount = totalAmount + ((element.OtHours * element.EmployeeOTRate) + element.EmployeeSalary);
    });
    return totalAmount;
  }



  updatePayment(payment: EmployeePaySheet) {
    
    payment.OnTime = new Date(payment.OnTime.getTime() - payment.OnTime.getTimezoneOffset() * 60000);
    payment.OffTime = new Date(payment.OffTime.getTime() - payment.OffTime.getTimezoneOffset() * 60000);
    
    let payMentObject: PaymentObject = {EmployeePaySheet: payment, AType: 'UPDATE', EstateId: this.selectedEstate.Id, SelectedDate: this.selectedDate  }
    //this.employeePayments.push(this.deep(this.newPayment))
    this.zesnaEmployeeModel.SetEmployeePaySheet(payMentObject).then(
      (data) => {
        this.getEmployeePaySheet();
      }
    );
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
