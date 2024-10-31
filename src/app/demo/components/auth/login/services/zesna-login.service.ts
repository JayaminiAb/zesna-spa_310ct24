import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { API$DOMAIN } from 'src/app/demo/core/api-configs';
import { ErrorMessage } from 'src/app/demo/core/error-message';

@Injectable({
  providedIn: 'root'
})
export class ZesnaLoginService {
  private LoginAuthenticationUrl = API$DOMAIN + 'api/Authentication/LoginAuthentication';
  private LogoutUserUrl = API$DOMAIN + 'api/Authentication/LogoutUser';

  constructor(private http: HttpClient, private router: Router) { }

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
