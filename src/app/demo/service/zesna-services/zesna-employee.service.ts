import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';
import { Filter, TransportFilter } from '../../core/filter';
import { TransportReport } from '../../core/transport/transport-report';
import { EmployeeAttendance, EmployeeDetails, EmployeePaySheet, EmployeeSalarySheet, EventHoliday, PaymentObject } from '../../core/employee/employee-details';


@Injectable({
  providedIn: 'root'
})
export class ZesnaEmployeeService {

  // API Urls
  private GetAllEmployeeInfoDetailsWithPGUrl = API$DOMAIN + 'api/EmployeeManagement/GetAllEmployeeInfoDetailsWithPG';
  private GetEmployeeInfoDetailsByIdUrl = API$DOMAIN + 'api/EmployeeManagement/GetEmployeeInfoDetailsById';
  private SetlEmployeeInfoDetailsUrl = API$DOMAIN + 'api/EmployeeManagement/SetlEmployeeInfoDetails';
  private GetPermanentEmployeeSalarySheetUrl = API$DOMAIN + 'api/EmployeeManagement/GetPermanentEmployeeSalarySheet';
  private GetEmployeePaySheetUrl = API$DOMAIN + 'api/Report/GetEmployeePaySheet';

  private SetEmployeePaySheetUrl = API$DOMAIN + 'api/Report/SetEmployeePaySheet';

  private GetAllEmployeeAttendanceUrl = API$DOMAIN + 'api/Report/GetEmployeeAttendanceReport';
  private SetEmployeeAttendanceReportUrl = API$DOMAIN + 'api/Report/SetEmployeeAttendanceReport';
  private GetEmployeeAttendanceReportForMonthUrl = API$DOMAIN + 'api/Report/GetEmployeeAttendanceReportForMonth';
  private SetAllHolidaysUrl = API$DOMAIN + 'api/Report/SetAllHolidays';
  private GetAllEventHolidayUrl = API$DOMAIN + 'api/Report/GetAllHolidays';


  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  GetAllEventHoliday(year: number, month: number,  estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
    .set("year", year.toString())
    .set("month", month.toString())
    .set("estateId", estateId.toString());


    return this.http.post<EventHoliday[]>(this.GetAllEventHolidayUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllEventHoliday', error)
      })
    );
  }
  SetAllHolidays(eventHoliday: EventHoliday, selectedDate: string,  estateId: number,  actionType: string) {
    // Setting the params
    let my_params = new HttpParams()
    .set("selectedDate", selectedDate.toString())
    .set("actionType", actionType.toString())
    .set("estateId", estateId.toString());


    return this.http.post<boolean>(this.SetAllHolidaysUrl, eventHoliday, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetPermanentEmployeeSalarySheet', error)
      })
    );
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

  GetEmployeePaySheet(filter: TransportFilter, searchSpecific: boolean = false, recordsPerPage: number = 10, currentPage: number = 1) {
    // Setting the params
    let my_params = new HttpParams()
    .set("searchForSpecific", searchSpecific.toString())
    .set("currentPage", currentPage.toString())
    .set("recordsPerPage", recordsPerPage.toString());


    return this.http.post<EmployeePaySheet[]>(this.GetEmployeePaySheetUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetEmployeePaySheet', error)
      })
    );
  }
  GetPermanentEmployeeSalarySheet(year: number, month: number, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
    .set("selectedYear", year.toString())
    .set("selectedMonth", month.toString())
    .set("estateId", estateId.toString());


    return this.http.get<EmployeeSalarySheet[]>(this.GetPermanentEmployeeSalarySheetUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetPermanentEmployeeSalarySheet', error)
      })
    );
  }
  SetEmployeePaySheet(payMentObject: PaymentObject, onTime: string, offTime: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("OnTime", onTime.toString())
      .set("OffTime", offTime.toString());


    return this.http.post<boolean>(this.SetEmployeePaySheetUrl, payMentObject, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetEmployeePaySheet', error)
      })
    );
  }

  // Helper function to format the date
  formatDate(date: Date): string {
    return date.toString(); // Change this as needed to match the API's expected format
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
