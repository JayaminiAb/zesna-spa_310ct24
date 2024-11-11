import { Component, OnInit } from '@angular/core';
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
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';

@Component({
  selector: 'app-transport-report-list',
  templateUrl: './transport-report-list.component.html',
  styleUrl: './transport-report-list.component.scss',
  providers: [DialogService, MessageService]
})
export class TransportReportListComponent implements OnInit {
  selectedCompany: Company;
  selectedCompanyDetails: CompanyDetails;
  ref: DynamicDialogRef | undefined;
  companies: Company[] = [
    { label: 'Company A', value: 1 },
    { label: 'Company B', value: 2 },
    // Add more companies here
  ];
  newTransportDetails: TransportReport = {
    Id: 0,
    Route: '',
    Fuel: 0,
    DriverBata: 0,
    DriverMeals: 0,
    HelperBata: 0,
    HelperMeals: 0,
    HighwayCharges: 0,
    BusFairParking: 0,
    OverallId: 0,
    TransportStartDate: new Date(),
    TransportEndDate: new Date(),
    VehicleNo: '',
    TransportItem: '',
    AddedDate: new Date()
  };

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
  }
  datesWithin: Date[] = [this.getDate30DaysAgo(), new Date()]
  vehicleNumber: string = "";
  transportedItem: string = "";
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  constructor(public dialogService: DialogService, public messageService: MessageService, private _zesnaCommonService: ZesnaCommonService, private _zesnaTransportService: ZesnaTransportService) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaTransportModel = new ZesnaTransportModel(this._zesnaTransportService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();
  }

  ngOnInit(): void {
    this.getEstateListByUserId();
  }

  getDate30DaysAgo(): Date {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date;
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstatesByUserId(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEstateTransportReports();
        }
      }
    );
  }

  getEstateTransportReports() {
    this.zesnaTransportModel.GetTransportReport({ EstateId: this.selectedEstate.Id, TransportedItem: this.transportedItem, VehicleNumber: this.vehicleNumber, StartDate: this.datesWithin[0], EndDate: this.datesWithin[1] }).then(
      (data) => {
        this.transportReports = <TransportReport[]>data;
      }
    );
  }

  onEstateChange() {
    // Fetch and filter petty cash history based on the selected company

    this.getEstateTransportReports();
  }

  viewReport(report: TransportReport) {

    this.showTransportReport(this.transportReports.find(item => item.Id == report.Id));
  }
  editReport(report: TransportReport) {
    this.displayTransportSlider = true;
    report.TransportStartDate = new Date(report.TransportStartDate);
    report.TransportEndDate = new Date(report.TransportEndDate);

    this.newTransportDetails = { ...report };
  }
  deleteReport(report: TransportDetails) { }
  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
  addNewReport(): void {
    this.newTransportDetails = this.deep(
      {
        Id: 0,
        Route: '',
        Fuel: 0,
        DriverBata: 0,
        DriverMeals: 0,
        HelperBata: 0,
        HelperMeals: 0,
        HighwayCharges: 0,
        BusFairParking: 0,
        OverallId: 0,
        TransportStartDate: new Date(),
        TransportEndDate: new Date(),
        VehicleNo: '',
        TransportItem: '',
        AddedDate: new Date()
      }
    )
    this.displayTransportSlider = true;
  }

  hideTransportSlider(): void {
    this.newTransportDetails = this.deep(
      {
        Id: 0,
        Route: '',
        Fuel: 0,
        DriverBata: 0,
        DriverMeals: 0,
        HelperBata: 0,
        HelperMeals: 0,
        HighwayCharges: 0,
        BusFairParking: 0,
        OverallId: 0,
        TransportStartDate: new Date(),
        TransportEndDate: new Date(),
        VehicleNo: '',
        TransportItem: '',
        AddedDate: new Date()
      }
    );
    this.displayTransportSlider = false;
  }
  saveTransportDetails(type: string) {
    this.zesnaTransportModel.SetTransportReport(this.newTransportDetails, this.selectedEstate.Id, type).then(
      (data) => {
        this.transportReports = <TransportReport[]>data;

        this.hideTransportSlider();
      }
    );
  }
  showTransportReport(report: TransportReport) {
    this.ref = this.dialogService.open(TransportReportComponent, {
      header: 'Transport Report',
      width: '100%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true,
      data: report
    });

    this.ref.onClose.subscribe((event: any) => {
      this.hideTransportSlider();
      if (event) {

      }
    });
  }



}
