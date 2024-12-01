import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { ZesnaEmployeeService } from 'src/app/demo/service/zesna-services/zesna-employee.service';

@Component({
  selector: 'app-employee-paysheet-main',

  templateUrl: './employee-paysheet-main.component.html',
  styleUrl: './employee-paysheet-main.component.scss',
  providers: [DialogService, MessageService, DatePipe]
})
export class EmployeePaysheetMainComponent {
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
  selectedDate: Date = new Date();
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  activeTabIndex = 0;
  constructor(public dialogService: DialogService, public messageService: MessageService,
    private _zesnaCommonService: ZesnaCommonService,
    private _zesnaEmployeeService: ZesnaEmployeeService, private datePipe: DatePipe,
    private router: Router
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
  onTabChange(event: any): void {
    this.activeTabIndex = event.index;
    if (this.activeTabIndex === 0) {
      this.router.navigate(['main/employee/pay_sheet_main/temp_emp_pay_sheet',this.selectedEstate.Id]);
    } else if (this.activeTabIndex === 1) {
      this.router.navigate(['main/employee/pay_sheet_main/per_emp_pay_sheet',this.selectedEstate.Id]);
    }
  }
  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.router.navigate(['main/employee/pay_sheet_main/temp_emp_pay_sheet',this.selectedEstate.Id]);

        }
      }
    );
  }

  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company

    
  }

  onDateRangeChange(event: any) {
   
  }

 
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
