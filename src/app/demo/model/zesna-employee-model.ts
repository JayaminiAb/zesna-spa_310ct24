import { Subscription } from "rxjs";
import { ZesnaUserService } from "../service/zesna-services/zesna-user.service";
import { Filter, TransportFilter } from "../core/filter";
import { UserDetails } from "../core/user/user-details";
import { ZesnaTransportService } from "../service/zesna-services/zesna-transport.service";
import { TransportReport } from "../core/transport/transport-report";
import { ZesnaEmployeeService } from "../service/zesna-services/zesna-employee.service";
import { EmployeeAttendance, EmployeeDetails, EmployeePaySheet, EmployeeSalarySheet, EventHoliday, PaymentObject } from "../core/employee/employee-details";

export class ZesnaEmployeeModel {

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

    GetEmployeeInfoDetailsById(employeeId: number) {
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

    GetEmployeePaySheet(filter: TransportFilter, searchSpecific: boolean = false, recordsPerPage: number = 10, currentPage: number = 1 ) {
        
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetEmployeePaySheet(filter, searchSpecific, recordsPerPage, currentPage).subscribe(
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
    GetPermanentEmployeeSalarySheet(year: number, month: number, estateId: number) {
        
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetPermanentEmployeeSalarySheet(year, month, estateId).subscribe(
                data => {
                    let returnData = <EmployeeSalarySheet[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }
    SetEmployeePaySheet(payMentObject: PaymentObject, onTime: string, offTime: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.SetEmployeePaySheet(payMentObject, onTime, offTime).subscribe(
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

    // Helper function to format the date
    formatDate(date: Date): string {
        return date.toISOString(); // Change this as needed to match the API's expected format
    }

    GetAllEmployeeAttendance(transportFilter: TransportFilter) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetAllEmployeeAttendance(transportFilter).subscribe(
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
    SetEmployeeAttendanceReport(employeeAttendance: EmployeeAttendance, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.SetEmployeeAttendanceReport(employeeAttendance, estateId).subscribe(
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


    GetEmployeeAttendanceReportForMonth(employeeId: number, yearInt: number, monthInt: number, estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetEmployeeAttendanceReportForMonth(employeeId, yearInt, monthInt, estateId).subscribe(
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

    SetAllHolidays(eventHoliday: EventHoliday, selectedDate: string,  estateId: number,  actionType: string) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.SetAllHolidays(eventHoliday, selectedDate, estateId, actionType).subscribe(
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
    GetAllEventHoliday(year: number, month: number,  estateId: number) {
        var promise = new Promise((resolve, reject) => {
            this.allSubscriptions.push(this._zesnaEmployeeService.GetAllEventHoliday(year, month, estateId).subscribe(
                data => {
                    let returnData = <EventHoliday[]>data;
                    // Resolve the promise
                    resolve(returnData);
                })
            );
        });
        // return the promise
        return promise;
    }


}