import { Subscription } from "rxjs";
import { ZesnaUserService } from "../service/zesna-services/zesna-user.service";
import { Filter } from "../core/filter";
import { UserDetails } from "../core/user/user-details";
import { ZesnaTransportService } from "../service/zesna-services/zesna-transport.service";
import { TransportReport } from "../core/transport/transport-report";
import { ZesnaEmployeeService } from "../service/zesna-services/zesna-employee.service";
import { EmployeeAttendance, EmployeeDetails, EmployeePaySheet } from "../core/employee/employee-details";

export class ZesnaEmployeeModel{
 
    //Store subscriptions
    allSubscriptions: Subscription[] = [];

    // Constructor
    constructor(private _zesnaEmployeeService: ZesnaEmployeeService) {

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
     GetAllEmployeeInfoDetailsWithPG(filter: Filter, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetAllEmployeeInfoDetailsWithPG(filter, estateId).subscribe(
                data => {
                    let returnData = <EmployeeDetails[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }

    GetEmployeeInfoDetailsById( employeeId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetEmployeeInfoDetailsById(employeeId).subscribe(
                data => {
                    let returnData = <EmployeeDetails>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetlEmployeeInfoDetails(employee: EmployeeDetails, estateId: number, type: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.SetlEmployeeInfoDetails(employee, estateId, type).subscribe(
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

      GetEmployeePaySheet( selectedDate: Date, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetEmployeePaySheet(selectedDate, estateId).subscribe(
                data => {
                    let returnData = <EmployeePaySheet[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetEmployeePaySheet(employeePaySheet: EmployeePaySheet, selectedDate: Date, estateId: number, type: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.SetEmployeePaySheet(employeePaySheet, selectedDate, estateId, type).subscribe(
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
      GetAllEmployeeAttendance(estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetAllEmployeeAttendance(estateId).subscribe(
                data => {
                    let returnData = <EmployeeAttendance[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
      }


}