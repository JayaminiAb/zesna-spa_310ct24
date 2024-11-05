import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';
import { Filter, TransportFilter } from '../../core/filter';
import { TransportReport } from '../../core/transport/transport-report';
import { EmployeeAttendance, EmployeeDetails, EmployeePaySheet, PaymentObject } from '../../core/employee/employee-details';


@Injectable({
  providedIn: 'root'
})
export class ZesnaEmployeeService {

  // API Urls
  private GetAllEmployeeInfoDetailsWithPGUrl = API$DOMAIN + 'api/EmployeeManagement/GetAllEmployeeInfoDetailsWithPG';
  private GetEmployeeInfoDetailsByIdUrl = API$DOMAIN + 'api/EmployeeManagement/GetEmployeeInfoDetailsById';
  private SetlEmployeeInfoDetailsUrl = API$DOMAIN + 'api/EmployeeManagement/SetlEmployeeInfoDetails';
  private GetEmployeePaySheetUrl = API$DOMAIN + 'api/Report/GetEmployeePaySheet';

  private SetEmployeePaySheetUrl = API$DOMAIN + 'api/Report/SetEmployeePaySheet';

  private GetAllEmployeeAttendanceUrl = API$DOMAIN + 'api/Report/GetEmployeeAttendanceReport';
  private SetEmployeeAttendanceReportUrl = API$DOMAIN + 'api/Report/SetEmployeeAttendanceReport';
  private GetEmployeeAttendanceReportForMonthUrl = API$DOMAIN + 'api/Report/GetEmployeeAttendanceReportForMonth';


  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  GetEmployeeAttendanceReportForMonth(employeeId: number, yearInt: number, monthInt: number, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("employeeId", employeeId.toString())
      .set("yearInt", yearInt.toString())
      .set("monthInt", monthInt.toString())
      .set("estateId", estateId.toString());


    return this.http.get<EmployeeAttendance[]>(this.GetEmployeeAttendanceReportForMonthUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetEmployeeAttendanceReportForMonth', error)
      })
    );
  }

  SetEmployeeAttendanceReport(employeeAttendance: EmployeeAttendance, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());


    return this.http.post<boolean>(this.SetEmployeeAttendanceReportUrl, employeeAttendance, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetEmployeeAttendanceReport', error)
      })
    );
  }

  GetAllEmployeeAttendance(transportFilter: TransportFilter) {
    // Setting the params
    let my_params = new HttpParams();


    return this.http.post<EmployeeAttendance[]>(this.GetAllEmployeeAttendanceUrl, transportFilter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllEmployeeAttendance', error)
      })
    );
  }
  GetAllEmployeeInfoDetailsWithPG(filter: Filter, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());


    return this.http.post<EmployeeDetails[]>(this.GetAllEmployeeInfoDetailsWithPGUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllEmployeeInfoDetailsWithPG', error)
      })
    );
  }
  GetEmployeeInfoDetailsById(employeeId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("employeeId", employeeId.toString());


    return this.http.get<EmployeeDetails>(this.GetEmployeeInfoDetailsByIdUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetEmployeeInfoDetailsById', error)
      })
    );
  }

  SetlEmployeeInfoDetails(employee: EmployeeDetails, estateId: number, type: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString())
      .set("actionType", type.toString());


    return this.http.post<boolean>(this.SetlEmployeeInfoDetailsUrl, employee, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetlEmployeeInfoDetails', error)
      })
    );
  }

  GetEmployeePaySheet(filter: TransportFilter) {
    // Setting the params
    let my_params = new HttpParams();


    return this.http.post<EmployeePaySheet[]>(this.GetEmployeePaySheetUrl, filter).pipe(
      catchError(error => {
        return this.handleError('GetEmployeePaySheet', error)
      })
    );
  }
  SetEmployeePaySheet(payMentObject: PaymentObject) {
    // Setting the params
    let my_params = new HttpParams()


    return this.http.post<boolean>(this.SetEmployeePaySheetUrl, payMentObject).pipe(
      catchError(error => {
        return this.handleError('SetEmployeePaySheet', error)
      })
    );
  }


  //----------- Common methods------------------//
  //The function of handling the error
  private handleError(methodName: string, exception: Error) {
    // Creating the error message object 
    let errorMessage: ErrorMessage = {
      Name: exception.name,
      Message: exception.message,
      StatusText: exception['statusText'],
      Url: exception['url']
    };
    // Redirect to the error message
    this.router.navigate(['errorMessage'], { state: { response: errorMessage } });
    return ('Server error');
  }
}
