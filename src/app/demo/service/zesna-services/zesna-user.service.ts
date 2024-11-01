import { Injectable } from '@angular/core';
import { Filter } from '../../core/filter';
import { API$DOMAIN } from '../../core/api-configs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserDetails } from '../../core/user/user-details';
import { catchError } from 'rxjs';
import { ErrorMessage } from '../../core/error-message';
import { RoleDetails } from '../../core/role-details';

@Injectable({
  providedIn: 'root'
})
export class ZesnaUserService {
  


  private GetAllUserInfoDetailsWithPGUrl = API$DOMAIN + 'api/UserManagement/GetAllUserInfoDetailsWithPG';
  private SetUserInfoDetailsUrl = API$DOMAIN + 'api/UserManagement/SetlUserInfoDetails';
  private GetRoleDetailsUrl = API$DOMAIN + 'api/Authentication/GetRoleDetails';


  // Constructor
  constructor(private http: HttpClient, private router: Router) {

  }
  GetUserRoleList() {
    


  return this.http.get<RoleDetails[]>(this.GetRoleDetailsUrl).pipe(
    catchError(error => {
      return this.handleError('GetUserRoleList', error)
    })
  );
}
  // Authenticating the login
  GetAllUserInfoDetailsWithPG(filter: Filter, estateId: number) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString());


    return this.http.post<UserDetails[]>(this.GetAllUserInfoDetailsWithPGUrl, filter, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('GetAllUserInfoDetailsWithPG', error)
      })
    );
  }
  SetUserInfoDetails(selectedUserDetails: UserDetails, estateId: number, type: string) {
    // Setting the params
    let my_params = new HttpParams()
      .set("estateId", estateId.toString())
      .set("actionType", type.toString());


    return this.http.post<boolean>(this.SetUserInfoDetailsUrl, selectedUserDetails, { params: my_params }).pipe(
      catchError(error => {
        return this.handleError('SetUserInfoDetails', error)
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
