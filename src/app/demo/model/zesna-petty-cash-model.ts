import { Subscription } from "rxjs";
import { Filter, TransportFilter } from "../core/filter";

import { ZesnaPettyCashService } from "../service/zesna-services/zesna-petty-cash.service";
import { PettyCashReport, PettyCashRequestBody, ReimburseDetails } from "../core/petty-cash/petty-cash";

export class ZesnaPettyCashModel{
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private _zesnaPettyCashService: ZesnaPettyCashService) {

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
     GetAllReimburseDetails(filter: Filter, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaPettyCashService.GetAllReimburseDetails(filter, estateId).subscribe(
                data => {
                    let returnData = <ReimburseDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

     // Check if the email exists
     GetEstateBalance(estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaPettyCashService.GetEstateBalance(estateId).subscribe(
                data => {
                    let returnData = <number>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    SetReimburseBalance( estateId: number, reimburseAmount: number, userId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaPettyCashService.SetReimburseBalance(estateId, reimburseAmount, userId).subscribe(
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

    GetPettyCashReport( obj: TransportFilter) {
        var promise = new Promise((resolve, reject) => {
            debugger
            this.allSubscriptions.push(this._zesnaPettyCashService.GetPettyCashReport(obj).subscribe(
                data => {
                    let returnData = <PettyCashReport[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetPettyCashReport(Obj: PettyCashRequestBody) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaPettyCashService.SetPettyCashReport(Obj).subscribe(
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