import { Component } from '@angular/core';
import { State } from '../../state';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { Filter } from 'src/app/demo/core/filter';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { dA } from '@fullcalendar/core/internal-common';
import { DEV_STATE } from 'src/app/demo/core/api-configs';


@Component({
  selector: 'app-estate-management',
  templateUrl: './estate-management.component.html',
  styleUrl: './estate-management.component.scss'
})
export class EstateManagementComponent {
  displaySlider: boolean = false;
  editingState: boolean = false;
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  estatesDetails: EstateDetails[] = [];
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name'

  }
  runningMode = DEV_STATE;
  zesnaEstateModel: ZesnaEstateModel;
  constructor(private _zesnaEstateService: ZesnaCommonService) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaEstateService);
  }
  ngOnDestroy() {
    // Unsubscribe all
    
    this.zesnaEstateModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    if(this.runningMode != 'TESTING'){
      this.getAllEstatesWithPG();
    }
    
  }

  getAllEstatesWithPG() {
    this.zesnaEstateModel.GetAllEstateDetailsWithPG(this.filter).then(
      (data) => {
        if (data) {
          this.estatesDetails = data;
        }
      }
    );
  }

  getFullEstateDetails(estateId: number) {
    this.zesnaEstateModel.GetFullEstateDetailsById(estateId).then(
      (data) => {
        if (data) {
          this.selectedEstate = data;
        }
      }
    );
  }

  showSlider(): void {
    this.displaySlider = true;
    this.editingState = false;

  }

  hideSlider(): void {
    this.displaySlider = false;
  }

  saveState(type: string): void {
    this.zesnaEstateModel.SetEstateDetails(type,this.selectedEstate);
    this.getAllEstatesWithPG();
    this.hideSlider();
  }

  addNewState() {
    this.editingState = true;
    this.selectedEstate = this.deep({
      Id: 0,
      Name: '',
      AddressDetails: '',
      ContactNumber: '',
      OtherDetails: '',
      Balance: 0,
      Total: 0
    });
    this.showSlider();
  }
  viewState(state: EstateDetails): void {
    this.editingState = true;
    this.selectedEstate = this.deep(state);
    // Implement view logic here
    this.showSlider();
  }

  editState(state: EstateDetails): void {
    this.editingState = true;
    this.selectedEstate = this.deep(state);
    this.showSlider();
  }

  deleteState(state: EstateDetails): void {
    this.zesnaEstateModel.SetEstateDetails('REMOVE', state).then(
      (data) => {
        this.getAllEstatesWithPG();
      }

    );
  }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
