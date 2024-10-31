import { Component } from '@angular/core';
import { Company, CompanyDetails, PettyCashHistory } from "../../core/petty-cash";
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { Filter } from 'src/app/demo/core/filter';
import { ZesnaEmployeeModel } from 'src/app/demo/model/zesna-employee-model';
import { ZesnaPettyCashService } from 'src/app/demo/service/zesna-services/zesna-petty-cash.service';
import { ZesnaPettyCashModel } from 'src/app/demo/model/zesna-petty-cash-model';
import { ReimburseDetails } from 'src/app/demo/core/petty-cash/petty-cash';

@Component({
  selector: 'app-reimbursing',
  templateUrl: './reimbursing.component.html',
  styleUrl: './reimbursing.component.scss'
})
export class ReimbursingComponent {
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
  pettyCashHistory: ReimburseDetails[] = [];
  
  selectedDate: Date = new Date;
  reimbursementAmount: number;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
    //Store estate model
    zesnaPettyCashModel: ZesnaPettyCashModel;
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name',
    DatesWithin: []
  }

  constructor( private _zesnaCommonService: ZesnaCommonService, private _zesnaPettyCashService: ZesnaPettyCashService) { 
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaPettyCashModel = new ZesnaPettyCashModel(this._zesnaPettyCashService);
    
  }


  ngOnInit(): void {
    // Initially filter by the last month
    this.getEstateListByUserId();
  }

  
  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getReimburseDetails();
        }
      }
    );
  }

  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    this.getReimburseDetails();
  }

  getReimburseDetails(){
    this.zesnaPettyCashModel.GetAllReimburseDetails(this.filter, this.selectedEstate.Id).then(
      (data) => {
        if (data) {
          this.pettyCashHistory = <ReimburseDetails[]>data;
          
          
        }
      }
    );
  }


 
  

  reimbursePettyCash() {
    this.zesnaPettyCashModel.SetReimburseBalance(this.selectedEstate.Id, this.reimbursementAmount, this.selectedEstate.Id).then(
      (data) => {
        this.getReimburseDetails();
      }
    );
  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }


}
