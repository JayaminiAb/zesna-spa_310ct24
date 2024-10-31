
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';
import { EstateDetails } from '../../core/estate/estate-details';
import { Filter } from '../../core/filter';

@Injectable({
  providedIn: 'root'
})
export class ZesnaCommonService {

  // API Urls
  private GetAllEstateDetailsUrl = API$DOMAIN + 'api/Estate/GetAllEstateDetails';
  private GetAllEstateDetailsWithPGUrl = API$DOMAIN + 'api/Estate/GetAllEstateDetailsWithPG';
  private GetAllEstateDetailsByIdUrl = API$DOMAIN + 'api/Estate/GetAllEstateDetailsById';
  private SetEstateDetailsUrl = API$DOMAIN + 'api/Estate/SetlEstateDetails';
  private GetEstateBalanceUrl = API$DOMAIN + 'api/Estate/GetEstateBalance';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Authenticating the login
  GetAllEstateDetails(userId: number) {
    // Setting the params
    let my_params = new HttpParams();

    return this.http.get<EstateDetails[]>(this.GetAllEstateDetailsUrl).pipe(
      catchError(error => {
        return this.handleError('LoginAuthentication', error)
      })
    );
  }

  // Authenticating the login
  GetAllEstateDetailsWithPG(filter: Filter) {
    // Setting the params
    // let my_params = new HttpParams();
    return this.http.post<EstateDetails[]>(this.GetAllEstateDetailsWithPGUrl, filter).pipe(
      catchError(error => {
        return this.handleError('GetAllEstateDetailsWithPG', error)
      })
    );
  }

  // Authenticating the login
  GetFullEstateDetailsById(estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());

    return this.http.get<EstateDetails>(this.GetAllEstateDetailsByIdUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllEstateDetailsById', error)
      })
    );
  }

  // Authenticating the login
  SetEstateDetails(actionType: string, estateDetails: EstateDetails) {
    // Setting the params
    let my_params = new HttpParams()
      .set("actionType", actionType.toString());

    return this.http.post<boolean>(this.SetEstateDetailsUrl, estateDetails,{ params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetEstateDetails', error)
      })
    );
  }

  // Authenticating the login
  GetEstateBalance(estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
    .set("estateId", estateId.toString());

    return this.http.get<number>(this.GetEstateBalanceUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetEstateBalance', error)
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

