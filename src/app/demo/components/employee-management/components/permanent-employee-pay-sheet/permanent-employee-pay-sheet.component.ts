import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_PERM_EMP_PAY, EmployeeSalarySheet, DisplayEmployeeSalarySheet } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';

@Component({
  selector: 'app-permanent-employee-pay-sheet',
  templateUrl: './permanent-employee-pay-sheet.component.html',
  styleUrl: './permanent-employee-pay-sheet.component.scss'
})
export class PermanentEmployeePaySheetComponent {
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
  displayEmployeePayments:  DisplayEmployeeSalarySheet[] = [];
  constructor(private route: ActivatedRoute){}

  ngOnInit(){
     // Retrieve the estateId from the route parameter
     this.selectedEstate.Id = +this.route.snapshot.paramMap.get('estateId');
     this.employeePayments.push(DEFAULT_PERM_EMP_PAY);
     this.generateDisplayTable();
     
  }
  onDateRangeChange(event: any) {
    debugger
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.updatedDate = newDate;
  }
  getTotalAmount(){
    return 0;
  }
  getFirstHalfSalary(payment: EmployeeSalarySheet){
    return 0;
  }
  getSecondHalfSalary(payment: EmployeeSalarySheet){
    return 0;
  }
  getFirstHalfOT(payment: EmployeeSalarySheet){
    return 0;
  }
  getSecondHalfOT(payment: EmployeeSalarySheet){
    return 0;
  }
  getTotalMonthlySalary(payment: EmployeeSalarySheet){
    return 0;
  }
  getEpf(payment: EmployeeSalarySheet){
    return 0;
  }
  getEtf(payment: EmployeeSalarySheet){
    return 0;
  }
  getNoPay(payment: EmployeeSalarySheet){
    return 0;
  }
  getNetSalary(payment: EmployeeSalarySheet){
    return 0;
  }
  getSalaryDeduction(payment: EmployeeSalarySheet){
    return 0;
  }
  generateDisplayTable(){
    this.displayEmployeePayments = [];
    for (let index = 0; index < this.employeePayments.length; index++) {
      let obj : DisplayEmployeeSalarySheet = {
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
    console.log( this.displayEmployeePayments)
  }
}
