import { Component } from '@angular/core';
import { emptyTransportFullDetails, transportFullDetails, TransportFullDetails } from '../../core/transport';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-transport-report',
  templateUrl: './transport-report.component.html',
  styleUrl: './transport-report.component.scss'
})
export class TransportReportComponent {

  selectedTransportFullDetails: TransportFullDetails = emptyTransportFullDetails;
  constructor(public ref: DynamicDialogRef, private config: DynamicDialogConfig) {
    if(JSON.stringify(this.config.data)){
      this.selectedTransportFullDetails = <TransportFullDetails>this.config.data;
     
    }
   }
   // On click on confirmation button
  confirmDeleteItem(status: boolean){
    this.ref.close(status);
  }
}
