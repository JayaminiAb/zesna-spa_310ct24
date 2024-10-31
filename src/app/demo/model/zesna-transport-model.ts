import { Subscription } from "rxjs";
import { ZesnaUserService } from "../service/zesna-services/zesna-user.service";
import { Filter } from "../core/filter";
import { UserDetails } from "../core/user/user-details";
import { ZesnaTransportService } from "../service/zesna-services/zesna-transport.service";
import { TransportReport } from "../core/transport/transport-report";

export class ZesnaTransportModel{
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private _zesnaTransportService: ZesnaTransportService) {

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

     // Check if the email exists
     GetTransportReport(filter: Filter, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaTransportService.GetTransportReport(filter, estateId).subscribe(
                data => {
                    let returnData = <TransportReport[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetTransportReport(transportReport: TransportReport, estateId: number, type: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaTransportService.SetTransportReport(transportReport, estateId, type).subscribe(
                data => {
                    let returnData = <boolean>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
      }


}