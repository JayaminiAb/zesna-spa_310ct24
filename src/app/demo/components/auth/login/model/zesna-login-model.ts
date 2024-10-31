import { Subscription } from "rxjs";
import { ZesnaLoginService } from "../services/zesna-login.service";

export class ZesnaLoginModel{
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    constructor(private _zesnaLoginService: ZesnaLoginService){

    }

    // Unsubscribe all
    UnsubscribeAll() {
        // Loop through the services
        for (let i = 0; i < this.allSubscriptions.length; i++) {
            this.allSubscriptions[i].unsubscribe();
        }
        // End of Loop through the services
    }

    // Authenticating the login
    LoginAuthenticationService(email: string, password: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaLoginService.LoginAuthentication(email, password).subscribe(
                data => {
                    let returnData = <string>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise

        return promise;
    }

    // Logout user
    LogoutUserService(email: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaLoginService.LogoutUser(email).subscribe(
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