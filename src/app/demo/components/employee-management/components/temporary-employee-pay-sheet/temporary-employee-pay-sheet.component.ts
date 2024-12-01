import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DEFAULT_TEMP_EMP, TempEmployeePaySheet } from 'src/app/demo/core/employee/employee-details';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter } from 'src/app/demo/core/filter';

@Component({
  selector: 'app-temporary-employee-pay-sheet',
  templateUrl: './temporary-employee-pay-sheet.component.html',
  styleUrl: './temporary-employee-pay-sheet.component.scss'
})
export class TemporaryEmployeePaySheetComponent {

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
  employeePayments: TempEmployeePaySheet[] = [];
  temEmployee: TempEmployeePaySheet = this.deep(DEFAULT_TEMP_EMP);
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name'
  }
  searchSpecific = false;
  constructor(private route: ActivatedRoute){}

  ngOnInit(){
     // Retrieve the estateId from the route parameter
     this.selectedEstate.Id = +this.route.snapshot.paramMap.get('estateId');
  }

  onDateRangeChange(event: any) {
    
    const newDate = new Date(this.selectedDate);
    newDate.setDate(newDate.getDate() + 1);
    this.updatedDate = newDate;
  }
  getTotalAmount(){
    return 0;
  }
  addNewTempEmployee(){
    this.employeePayments.push(this.deep(DEFAULT_TEMP_EMP));
  }
  //Get All temp emp list for the day
  getTemEmpList(){

  } 
   // Making a deep copy
   deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
