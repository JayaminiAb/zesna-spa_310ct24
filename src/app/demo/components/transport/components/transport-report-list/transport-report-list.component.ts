import { Component } from '@angular/core';
import { Company, CompanyDetails } from '../../../petty_cash/core/petty-cash';
import { transportDetails, emptyTransportFullDetails, TransportDetails, TransportFullDetails, transportFullDetails } from '../../core/transport';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeAttendanceComponent } from '../../../employee-management/components/employee-attendance/employee-attendance.component';
import { TransportReportComponent } from '../transport-report/transport-report.component';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { EstateManagementModule } from '../../../estate-management/estate-management.module';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { Filter } from 'src/app/demo/core/filter';
import { ZesnaTransportModel } from 'src/app/demo/model/zesna-transport-model';
import { ZesnaTransportService } from 'src/app/demo/service/zesna-services/zesna-transport.service';
import { TransportReport } from 'src/app/demo/core/transport/transport-report';

@Component({
  selector: 'app-transport-report-list',
  templateUrl: './transport-report-list.component.html',
  styleUrl: './transport-report-list.component.scss',
  providers: [DialogService, MessageService]
})
export class TransportReportListComponent {
  selectedCompany: Company;
  selectedCompanyDetails: CompanyDetails;
  ref: DynamicDialogRef | undefined;
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  newTransportDetails: TransportFullDetails = this.deep(emptyTransportFullDetails);

  transportReports: TransportReport[] = [];
  fullTransportReports: TransportFullDetails[] = this.deep(transportFullDetails);

  displayTransportSlider: boolean = false;
  reportedWithin: Date[] | undefined;
   //Store logged user details
   loggedUserId: number = 0;
   loggedUserRole: string = '';
   //Store estate model
   zesnaEstateModel: ZesnaEstateModel;
   zesnaTransportModel: ZesnaTransportModel; 
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
  constructor(public dialogService: DialogService, public messageService: MessageService, private _zesnaCommonService: ZesnaCommonService, private _zesnaTransportService: ZesnaTransportService) { 
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaTransportModel = new ZesnaTransportModel(this._zesnaTransportService);
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEstateTransportReports();
        }
      }
    );
  }

  getEstateTransportReports(){
    this.zesnaTransportModel.GetTransportReport(this.filter, this.selectedEstate.Id).then(
      (data) => {
        this.transportReports = <TransportReport[]>data;
      }
    );
  }

  onEstateChange(event: any) {
    // Fetch and filter petty cash history based on the selected company
    this.selectedEstate = event;
    this.getEstateTransportReports();
  }

  viewReport(report: TransportDetails) {

    this.showTransportReport(this.fullTransportReports.find(item => item.Id == report.Id));
  }
  editReport(report: TransportDetails) {
    this.displayTransportSlider = true;
  }
  deleteReport(report: TransportDetails) { }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
  addNewReport(): void {
    this.displayTransportSlider = true;

  }

  hideTransportSlider(): void {
    this.displayTransportSlider = false;
  }
  saveTransportDetails() {
    this.zesnaTransportModel.GetTransportReport(this.filter, this.selectedEstate.Id).then(
      (data) => {
        this.transportReports = <TransportReport[]>data;
      }
    );
  }
  showTransportReport(report: TransportFullDetails) {
    this.ref = this.dialogService.open(TransportReportComponent, {
      header: 'Transport Report',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: report
    });

    this.ref.onClose.subscribe((event: any) => {
      if (event) {

      }
    });
  }

}
