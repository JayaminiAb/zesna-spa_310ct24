import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DEFAULT_TEMP_EMP, EmployeePaySheet, PaymentObject } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter, TransportFilter } from 'src/app/demo/core/filter';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';

@Component({
  selector: 'app-temporary-employee-pay-sheet',
  templateUrl: './temporary-employee-pay-sheet.component.html',
  styleUrl: './temporary-employee-pay-sheet.component.scss',
  providers: [DialogService, MessageService, DatePipe]
})
export class TemporaryEmployeePaySheetComponent {
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  selectedDate: Date = new Date();
  updatedDate: Date = new Date();
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  employeePayments: EmployeePaySheet[] = [];
  temEmployee: EmployeePaySheet = this.deep(DEFAULT_TEMP_EMP);
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name'
  }
  searchSpecific = false;
   // Store the cookie interface
   overallCookieInterface: OverallCookies;
     //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  transportFilter: TransportFilter = { EstateId: 0, TransportedItem: "", VehicleNumber: "", StartDate: new Date(), EndDate: new Date() }

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService,
  ) {
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }

  ngOnInit() {
    // Retrieve the estateId from the route parameter
    this.selectedEstate.Id = +this.route.snapshot.paramMap.get('estateId');
    this.getEmployeePaySheet(this.selectedDate);
  }

  onDateRangeChange(event: any) {

    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.updatedDate = newDate;
    this.getEmployeePaySheet(newDate);
  }
 
  addNewTempEmployee() {
    let payment: EmployeePaySheet = this.deep(DEFAULT_TEMP_EMP)
    let payMentObject: PaymentObject = { EmployeePaySheet: payment, AType: 'INSERT', EstateId: this.selectedEstate.Id, SelectedDate: this.selectedDate }
    //this.employeePayments.push(this.deep(this.newPayment))

    let onTime = this.datePipe.transform(payment.OnTime, 'yyyy-MM-dd hh:mm:ss');
    let offTime = this.datePipe.transform(payment.OffTime, 'yyyy-MM-dd hh:mm:ss');

    this.zesnaEmployeeModel.SetEmployeePaySheet(payMentObject, onTime, offTime).then(
      (data) => {
        this.getEmployeePaySheet(this.selectedDate);
      }
    );
    this.employeePayments.push(this.deep(DEFAULT_TEMP_EMP));
  }

  updatePayment(payment: EmployeePaySheet){
    let payMentObject: PaymentObject = { EmployeePaySheet: payment, AType: 'UPDATE', EstateId: this.selectedEstate.Id, SelectedDate: this.selectedDate }
    //this.employeePayments.push(this.deep(this.newPayment))

    let onTime = this.datePipe.transform(payment.OnTime, 'yyyy-MM-dd hh:mm:ss');
    let offTime = this.datePipe.transform(payment.OffTime, 'yyyy-MM-dd hh:mm:ss');

    this.zesnaEmployeeModel.SetEmployeePaySheet(payMentObject, onTime, offTime).then(
      (data) => {
        this.getEmployeePaySheet(this.selectedDate);
      }
    );
  }
  removeItem(payment: EmployeePaySheet) {
    let payMentObject: PaymentObject = { EmployeePaySheet: payment, AType: 'UPDATE', EstateId: this.selectedEstate.Id, SelectedDate: this.selectedDate }
    
    let onTime = this.datePipe.transform(payment.OnTime, 'yyyy-MM-dd hh:mm:ss');
    let offTime = this.datePipe.transform(payment.OffTime, 'yyyy-MM-dd hh:mm:ss');
     this.zesnaEmployeeModel.SetEmployeePaySheet(payMentObject, onTime, offTime).then(
       (data) => {

       }
     );
  }
  //Get All temp emp list for the day
  getEmployeePaySheet(selectedDate: Date) {
    this.transportFilter.EstateId = this.selectedEstate.Id;
    this.transportFilter.StartDate = selectedDate;

    this.zesnaEmployeeModel.GetEmployeePaySheet(this.transportFilter, this.searchSpecific, this.filter.RecordsPerPage, this.filter.CurrentPage).then(
      (data) => {
        this.employeePayments = <EmployeePaySheet[]>data;
        this.employeePayments.forEach(item => {
          item.OnTime = new Date(item.OnTime);
          item.OffTime = new Date(item.OffTime);
        });
      }

    );
  }

  getTotalAmount(){
    let total = 0;
    this.employeePayments.forEach(item => {
     total = total + (item.OtHours*item.EmployeeOTRate) + item.EmployeeSalary;
    });
    return total;
  }
  onChangeSearch(){
    
    this.getEmployeePaySheet(this.selectedDate);
  }
  onChangeCheckBox(){

    
      this.getEmployeePaySheet(this.selectedDate);
    
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }


}
