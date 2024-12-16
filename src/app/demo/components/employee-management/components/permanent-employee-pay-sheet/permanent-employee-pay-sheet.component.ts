import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DEFAULT_PERM_EMP_PAY, EmployeeSalarySheet, DisplayEmployeeSalarySheet, EmployeeAdvancePayment } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';

@Component({
  selector: 'app-permanent-employee-pay-sheet',
  templateUrl: './permanent-employee-pay-sheet.component.html',
  styleUrl: './permanent-employee-pay-sheet.component.scss',
  providers: [DialogService, MessageService, DatePipe]
})
export class PermanentEmployeePaySheetComponent {
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaEmployeeModel: ZesnaEmployeeModel;
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  selectedDate: Date = new Date();
  updatedDate: Date = new Date();
  employeePayments: EmployeeSalarySheet[] = [];
  displayEmployeePayments: DisplayEmployeeSalarySheet[] = [];
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  constructor(private route: ActivatedRoute, private datePipe: DatePipe,
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService,) {
    this.zesnaEmployeeModel = new ZesnaEmployeeModel(this._zesnaEmployeeService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }

  ngOnInit() {
    // Retrieve the estateId from the route parameter
    this.selectedEstate.Id = +this.route.snapshot.paramMap.get('estateId');
    let year = this.selectedDate.getFullYear();
    let month = this.selectedDate.getMonth();
    this.getEmployeesPaySheet(year, month + 1);

  }
  onDateRangeChange(event: any) {
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.updatedDate = newDate;
    let year = newDate.getFullYear();
    let month = newDate.getMonth();
    this.getEmployeesPaySheet(year, month + 1);
  }
  getEmployeesPaySheet(year: number, month: number) {

    this.zesnaEmployeeModel.GetPermanentEmployeeSalarySheet(year, month, this.selectedEstate.Id).then(
      (data) => {
        this.employeePayments = <EmployeeSalarySheet[]>data;
        this.generateDisplayTable();
      }

    );

  }
  getTotalAmount() {
    return 0;
  }
  getFirstHalfSalary(payment: EmployeeSalarySheet) {
    debugger
    // Declare the first half salary
    let firstHalfSalary = 0;
    let daySalary = 0;

    // Check if the user has a day salary
    if (payment.EmployeeDetails.SalaryTypeCode == 'DAILY') {
      // Getting the day salary
      daySalary = payment.EmployeeDetails.Salary;
      // Calculate the salary for 15 days
      firstHalfSalary = daySalary * 15;
    }
    // End of Check if the user has a day salary

    return firstHalfSalary;
  }
  getSecondHalfSalary(payment: EmployeeSalarySheet) {
    // Declare the first half salary
    let secondHalfSalary = 0;
    let daySalary = 0;
    // Getting the selected month and year
    let selectedYear = this.selectedDate;
    // Extract the month (0-based, so add 1 for 1-based month)
    const month = selectedYear.getMonth() + 1;
    // Extract the year
    const year = selectedYear.getFullYear();
    // Getting the no of days
    let noOfDays = this.getDaysFrom16ToEndOfMonth(month, year);
    // Check if the user has a day salary
    if (payment.EmployeeDetails.SalaryTypeCode == 'DAILY') {
      // Getting the day salary
      daySalary = payment.EmployeeDetails.Salary;
      // Calculate the salary for 15 days
      secondHalfSalary = daySalary * noOfDays;
    }
    // End of Check if the user has a day salary

    return secondHalfSalary;
  }
  getFirstHalfOT(payment: EmployeeSalarySheet) {
    // Getting the ot rate
    let otRate = payment.EmployeeDetails.OTRate;
    // Declare the return value
    let returnValue = 0;

    // Loop through the attendance
    for (let i = 0; i < payment.EmployeeAttendance.length; i++) {
      // Getting the attendance date
      let attendanceDate = new Date(payment.EmployeeAttendance[i].AddedDate);

      // Extract the date
      const date = attendanceDate.getDate();

      // Getting the selected month and year
      let selectedYear = this.selectedDate;
      // Extract the month (0-based, so add 1 for 1-based month)
      const month = selectedYear.getMonth() + 1;
      // Extract the year
      const year = selectedYear.getFullYear();
      // Getting the no of days
      let noOfDays = this.getDaysFrom16ToEndOfMonth(month, year);
      // Check the date comparison
      if (date > 15 && date <= (15 + noOfDays)) {
        // Difference
        // Calculate the difference in milliseconds
        const durationInMilliseconds = new Date(payment.EmployeeAttendance[i].OffTime).getTime() - new Date(payment.EmployeeAttendance[i].OnTime).getTime();
        // Convert milliseconds to hours
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        // Calculate excess hours above 8
        let excessHours = durationInHours - 8;
        excessHours = Math.max(0, Math.round(excessHours));

        returnValue += (excessHours * otRate);
      }
      // End of Check the date comparison
    }
    // End of Loop through the attendance

    return returnValue;
  }
  getSecondHalfOT(payment: EmployeeSalarySheet) {
    // Getting the ot rate
    let otRate = payment.EmployeeDetails.OTRate;
    // Declare the return value
    let returnValue = 0;

    // Loop through the attendance
    for (let i = 0; i < payment.EmployeeAttendance.length; i++) {
      // Getting the attendance date
      let attendanceDate = new Date(payment.EmployeeAttendance[i].AddedDate);

      // Extract the date
      const date = attendanceDate.getDate();

      // Check the date comparison
      if (date <= 15) {
        // Difference
        // Calculate the difference in milliseconds
        const durationInMilliseconds = new Date(payment.EmployeeAttendance[i].OffTime).getTime() - new Date(payment.EmployeeAttendance[i].OnTime).getTime();
        // Convert milliseconds to hours
        const durationInHours = durationInMilliseconds / (1000 * 60 * 60);
        // Calculate excess hours above 8
        let excessHours = durationInHours - 8;
        excessHours = Math.max(0, Math.round(excessHours));

        returnValue += (excessHours * otRate);
      }
      // End of Check the date comparison
    }
    // End of Loop through the attendance

    return returnValue;
  }
  getTotalMonthlySalary(payment: EmployeeSalarySheet) {
    // Declare the salary
    let monthlySalary = 0;
    let daySalary = 0;

    // Getting the selected month and year
    let selectedYear = this.selectedDate;
    // Extract the month (0-based, so add 1 for 1-based month)
    const month = selectedYear.getMonth() + 1;
    // Extract the year
    const year = selectedYear.getFullYear();
    // Getting the no of days
    let noOfDays = this.getDaysFrom16ToEndOfMonth(month, year);

    // Check if the user has a day salary
    if (payment.EmployeeDetails.SalaryTypeCode == 'DAILY') {
      // Getting the day salary
      daySalary = payment.EmployeeDetails.Salary;
      // Calculate the salary for 15 days
      monthlySalary = daySalary * (noOfDays + 15);
    } else {
      monthlySalary = payment.EmployeeDetails.Salary;
    }
    // End of Check if the user has a day salary
    return monthlySalary;
  }
  getEpf(payment: EmployeeSalarySheet) {
    // Declare the epf amount
    let empAmount = 0;
    // Getting the basic salary
    let basicSalary = payment.EmployeeDetails.BasicSalary;
    // Calculate the amount
    empAmount = (basicSalary * 0.08);
    return empAmount;
  }
  getEtf(payment: EmployeeSalarySheet) {
    // Declare the epf amount
    let empAmount = 0;
    // Getting the basic salary
    let basicSalary = payment.EmployeeDetails.BasicSalary;
    // Calculate the amount
    empAmount = (basicSalary * 0.0236);
    return empAmount;
  }
  getNoPay(payment: EmployeeSalarySheet) {
    // Declare nof of absence
    let noOfAbsence = 0;
    let daySalary = 0;
    let noPayValue = 0;

    // Getting the selected month and year
    let selectedYear = this.selectedDate;
    // Extract the month (0-based, so add 1 for 1-based month)
    const month = selectedYear.getMonth() + 1;
    // Extract the year
    const year = selectedYear.getFullYear();
    // Getting the no of days
    let noOfDays = this.getDaysFrom16ToEndOfMonth(month, year);

    // Loop through the attendance
    for (let i = 0; i < payment.EmployeeAttendance.length; i++) {
      if (payment.EmployeeAttendance[i].AttendanceSattus == 'L') {
        noOfAbsence++;
      }
    }
    // End of Loop through the attendance

    // Check if the user has a day salary
    if (payment.EmployeeDetails.SalaryTypeCode == 'DAILY') {
      // Getting the day salary
      daySalary = payment.EmployeeDetails.Salary;
    } else {
      daySalary = payment.EmployeeDetails.Salary / (15 + noOfDays);
    }
    // End of Check if the user has a day salary

    noPayValue = daySalary * noOfAbsence;

    return noPayValue;
  }
  getNetSalary(payment: EmployeeSalarySheet) {
    let monthlySal = this.getTotalMonthlySalary(payment);
    let firstOT = this.getFirstHalfOT(payment);
    let secondOT = this.getFirstHalfOT(payment);
    let basicSal = payment.EmployeeDetails.BasicSalary;

    let epf = this.getEpf(payment);
    let etf = this.getEtf(payment);
    let noPay = this.getNoPay(payment);

    let netSalary = (monthlySal + firstOT + secondOT + basicSal) - (epf + etf + noPay);

    return netSalary;
  }
  getSalaryDeduction(payment: EmployeeSalarySheet) {
    return 0;
  }
  getDaysFrom16ToEndOfMonth(month: number, year: number): number {
    // JavaScript Date uses 0-based indexing for months (0 = January, 11 = December)
    const totalDaysInMonth = new Date(year, month, 0).getDate(); // Get total days in the month
    const startingDay = 16;

    // Ensure starting day doesn't exceed total days in the month
    if (startingDay > totalDaysInMonth) {
      throw new Error("Invalid starting day for the given month and year");
    }

    // Calculate the days from the 16th to the end of the month
    return totalDaysInMonth - startingDay + 1;
  }

  generateDisplayTable() {
    this.displayEmployeePayments = [];
    for (let index = 0; index < this.employeePayments.length; index++) {
      let obj: DisplayEmployeeSalarySheet = {
        Name: this.employeePayments[index].EmployeeDetails.Fullname,
        SalaryFirstHalf: this.getFirstHalfSalary(this.employeePayments[index]),
        OTFirstHalf: this.getFirstHalfOT(this.employeePayments[index]),
        SalarySecondHalf: this.getSecondHalfSalary(this.employeePayments[index]),
        OTSecondHalf: this.getSecondHalfOT(this.employeePayments[index]),
        SalaryMonthlyTotal: this.getTotalMonthlySalary(this.employeePayments[index]),
        AdditionalPayment: this.employeePayments[index].AdditionDaySalary,
        BasicSalary: this.employeePayments[index].EmployeeDetails.BasicSalary,
        EPF: this.getEpf(this.employeePayments[index]),
        ETF: this.getEtf(this.employeePayments[index]),
        NoPay: this.getNoPay(this.employeePayments[index]),
        Advance: this.employeePayments[index].FirstHalfAdvanceList,
        TotalAdvanceAmount: this.employeePayments[index].TotalAdvancePayment,
        NetSalary: this.getNetSalary(this.employeePayments[index]),
        SalaryDeduction: this.getSalaryDeduction(this.employeePayments[index])
      }
      this.displayEmployeePayments.push(obj);

    }
   
    console.log(this.displayEmployeePayments)
  }

  setPaymentAdvanceDetails(paymentId: number, advance: EmployeeAdvancePayment, action: string){
    let year = this.selectedDate.getFullYear();
    let month = this.selectedDate.getMonth()+1;
    this.zesnaEmployeeModel.SetPermanentEmployeeAdvanceSalary(advance, paymentId, true, action).then(
      (data: number) => {
        this.getEmployeesPaySheet(year, month);
      }
 
    );
  }
  removeAdvance(advance: EmployeeAdvancePayment, paymentId: number){
    let year = this.selectedDate.getFullYear();
    let month = this.selectedDate.getMonth()+1;
    this.zesnaEmployeeModel.SetPermanentEmployeeAdvanceSalary(advance, paymentId, true, 'REMOVE').then(
      (data: number) => {
        this.getEmployeesPaySheet(year, month);
      }
 
    );
  }
  advanceAmount: number
  onAddAdvancePayment(payment: EmployeeSalarySheet, index: number){
    let year = this.selectedDate.getFullYear();
    let month = this.selectedDate.getMonth()+1;
    if(payment.Id === 0){
      this.zesnaEmployeeModel.SetPermanentEmployeeSalarySheet(payment,year, month, this.selectedEstate.Id, 'INSERT').then(
        (data: number) => {
          let advance: EmployeeAdvancePayment = {Id: 0, Amount: this.advanceAmount, PaymentDate: new Date(), Description: ''};
          this.setPaymentAdvanceDetails(data, advance, 'INSERT');
        }
  
      );
    }
    else{
      let advance: EmployeeAdvancePayment = {Id: 0, Amount: this.advanceAmount, PaymentDate: new Date(), Description: ''};
 
      this.setPaymentAdvanceDetails(payment.Id, advance, 'INSERT');
    }
  
  }

  onToggleItem(event: MouseEvent, overlayPanel: any): void {
    overlayPanel.toggle(event);
}
}


