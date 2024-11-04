import { Component } from '@angular/core';
import { emptyTransportFullDetails, transportFullDetails, TransportFullDetails } from '../../core/transport';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TransportReport } from 'src/app/demo/core/transport/transport-report';

@Component({
  selector: 'app-transport-report',
  templateUrl: './transport-report.component.html',
  styleUrl: './transport-report.component.scss'
})
export class TransportReportComponent {

  selectedTransportFullDetails: TransportReport = {
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
  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    if (JSON.stringify(this.config.data)) {
      this.selectedTransportFullDetails = <TransportReport>this.config.data;

    }
  }
  // On click on confirmation button
  confirmDeleteItem(status: boolean) {
    this.ref.close(status);
  }
}
