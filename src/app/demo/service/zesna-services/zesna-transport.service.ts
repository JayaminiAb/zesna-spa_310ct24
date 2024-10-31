import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';
import { Filter } from '../../core/filter';
import { TransportReport } from '../../core/transport/transport-report';


@Injectable({
  providedIn: 'root'
})
export class ZesnaTransportService {
  // API Urls
  private GetTransportReportUrl = API$DOMAIN + 'api/Report/GetTransportReport';
  private SetTransportReportUrl = API$DOMAIN + 'api/Report/SetTransportReport';
  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }
  GetTransportReport(filter: Filter, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());


    return this.http.post<TransportReport[]>(this.GetTransportReportUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetTransportReport', error)
      })
    );
  }

  SetTransportReport(transportReport: TransportReport, estateId: number, type: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString())
      .set("actionType", type.toString());


    return this.http.post<boolean>(this.SetTransportReportUrl, transportReport, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetTransportReport', error)
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
