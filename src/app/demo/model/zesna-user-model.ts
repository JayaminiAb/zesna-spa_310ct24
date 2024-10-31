import { Subscription } from "rxjs";
import { ZesnaUserService } from "../service/zesna-services/zesna-user.service";
import { Filter } from "../core/filter";
import { UserDetails } from "../core/user/user-details";

export class ZesnaUserModel{
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private _zesnaUserService: ZesnaUserService) {

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
     GetAllUserInfoDetailsWithPG(filter: Filter, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaUserService.GetAllUserInfoDetailsWithPG(filter, estateId).subscribe(
                data => {
                    let returnData = <UserDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetUserInfoDetails(selectedUserDetails: UserDetails, estateId: number, type: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaUserService.SetUserInfoDetails(selectedUserDetails, estateId, type).subscribe(
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