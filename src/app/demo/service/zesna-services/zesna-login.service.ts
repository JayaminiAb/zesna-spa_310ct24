import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from '../../core/api-configs';
import { ErrorMessage } from '../../core/error-message';

@Injectable({
  providedIn: 'root'
})
export class ZesnaLoginService {

  // API Urls
  private LoginAuthenticationUrl = API$DOMAIN + 'api/Authentication/LoginAuthentication';
  private LogoutUserUrl = API$DOMAIN + 'api/Authentication/LogoutUser';
  private GetUserAccessLevelsUrl = API$DOMAIN + 'api/Authentication/GetUserAccessLevels';
  private CheckEmailExistsUrl = API$DOMAIN + 'api/Authentication/CheckEmailExists';

  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }

  // Authenticating the login
  LoginAuthentication(email: string, password: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("email", email.toString())
      .set("password", password.toString());

    return this.http.get<string>(this.LoginAuthenticationUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('LoginAuthentication', error)
      })
    );
  }

  // Logout user
  LogoutUser(email: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("email", email.toString());

    return this.http.get<boolean>(this.LogoutUserUrl, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('LogoutUser', error)
      })
    );
  }

  // Check if the email exists
  CheckEmailExists(userEmail: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("userEmail", userEmail.toString());

    return this.http.get<boolean>(this.CheckEmailExistsUrl, { params: my_params }).pipe(
      catchError(error => {
        debugger
        return this.handleError('CheckEmailExists', error)
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
