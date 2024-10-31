import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';
import { Filter } from '../../core/filter';
import { TransportReport } from '../../core/transport/transport-report';
import { EmployeeDetails, EmployeePaySheet } from '../../core/employee/employee-details';
import { PettyCashReport, ReimburseDetails } from '../../core/petty-cash/petty-cash';


@Injectable({
  providedIn: 'root'
})
export class ZesnaPettyCashService {
  // API Urls
  private GetAllReimburseDetailsGUrl = API$DOMAIN + 'api/Report/GetAllReiburseDetails';
  private SetReimburseBalanceUrl = API$DOMAIN + 'api/Report/SetReimburseBalance';
  private GetPettyCashReportUrl = API$DOMAIN + 'api/Report/GetPettyCashReport';
  private SetPettyCashReportUrl = API$DOMAIN + 'api/Report/SetPettyCashReport';




  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }
  GetAllReimburseDetails(filter: Filter, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());


    return this.http.post<ReimburseDetails[]>(this.GetAllReimburseDetailsGUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllReimburseDetails', error)
      })
    );
  }

  SetReimburseBalance( estateId: number, reimburseAmount: number, userId: number,) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString())
      .set("reimburseAmount", reimburseAmount.toString())
      .set("userId", userId.toString());


    return this.http.get<boolean>(this.SetReimburseBalanceUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetReimburseBalance', error)
      })
    );
  }


  GetPettyCashReport(selectedDate: Date, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
    .set("selectedDate", selectedDate.toString())
      .set("estateId", estateId.toString());


    return this.http.get<PettyCashReport[]>(this.GetPettyCashReportUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetPettyCashReport', error)
      })
    );
  }

  
  SetPettyCashReport(pettyCashReport: PettyCashReport, selectedDate: Date, estateId: number, parentId: number, currentId: number, addDirection: string, actionType: string, userID: number) {
    // Setting the params
    let my_params = new HttpParams()
    .set("selectedDate", selectedDate.toString())
      .set("estateId", estateId.toString())
      .set("parentId", parentId.toString())
      .set("currentId", currentId.toString())
      .set("addDirection", addDirection.toString())
      .set("actionType", actionType.toString())
      .set("userID", userID.toString());


    return this.http.post<boolean>(this.SetPettyCashReportUrl, pettyCashReport, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetPettyCashReport', error)
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
