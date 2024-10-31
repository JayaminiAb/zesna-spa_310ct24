import { Subscription } from "rxjs";
import { ZesnaCommonService } from "../service/zesna-services/zesna-common.service";
import { EstateDetails } from "../core/estate/estate-details";
import { Filter } from "../core/filter";
import { UserDetails } from "../core/user/user-details";


export class ZesnaEstateModel {
    
    // Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private _zesnaCommonService: ZesnaCommonService) { }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
    }

    // Get all estate details
    GetAllEstateDetails(userId: number): Promise<EstateDetails[]> {
        return new Promise((resolve, reject) => {
            this.allSubscriptions.push(
                this._zesnaCommonService.GetAllEstateDetails(userId).subscribe({
                    next(data) {
                        resolve(<EstateDetails[]>data);  // Resolve with the data when the request succeeds
                    },
                    error(err) {
                        reject(err);    // Reject the promise if an error occurs
                    },
                    complete() {
                        console.log("Request completed");  // Optional: Do something when the request completes
                    }
                })
            );
        });
    }


    // Get all estate details with pagination
    GetAllEstateDetailsWithPG(filter: Filter): Promise<EstateDetails[]> {
        return new Promise((resolve, reject) => {
            this.allSubscriptions.push(
                this._zesnaCommonService.GetAllEstateDetailsWithPG(filter).subscribe({
                    next(data) {
                        resolve(<EstateDetails[]>data);  // Resolve with the data when the request succeeds
                    },
                    error(err) {
                        reject(err);    // Reject the promise if an error occurs
                    },
                    complete() {
                        console.log("Request completed");  // Optional: Do something when the request completes
                    }
                }

                )
            );
        });
    }

    // Get estate details by ID
    GetFullEstateDetailsById(estateId: number): Promise<EstateDetails> {
        return new Promise((resolve, reject) => {
            this.allSubscriptions.push(
                this._zesnaCommonService.GetFullEstateDetailsById(estateId).subscribe({
                    next(data) {
                        resolve(<EstateDetails>data);  // Resolve with the data when the request succeeds
                    },
                    error(err) {
                        reject(err);    // Reject the promise if an error occurs
                    },
                    complete() {
                        console.log("Request completed");  // Optional: Do something when the request completes
                    }
                }

                )
            );
        });
    }

    // Set estate details
    SetEstateDetails(actionType: string, estateDetails: EstateDetails): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.allSubscriptions.push(
                this._zesnaCommonService.SetEstateDetails(actionType, estateDetails).subscribe({
                    next(data) {
                        resolve(<boolean>data);  // Resolve with the data when the request succeeds
                    },
                    error(err) {
                        reject(err);    // Reject the promise if an error occurs
                    },
                    complete() {
                        console.log("Request completed");  // Optional: Do something when the request completes
                    }
                }
                )
            );
        });
    }

    // Get estate balance
    GetEstateBalance(estateId: number): Promise<number> {
        return new Promise((resolve, reject) => {
            this.allSubscriptions.push(
                this._zesnaCommonService.GetEstateBalance(estateId).subscribe({
                    next(data) {
                        resolve(<number>data);  // Resolve with the data when the request succeeds
                    },
                    error(err) {
                        reject(err);    // Reject the promise if an error occurs
                    },
                    complete() {
                        console.log("Request completed");  // Optional: Do something when the request completes
                    }
                }
                )
            );
        });
    }
}
