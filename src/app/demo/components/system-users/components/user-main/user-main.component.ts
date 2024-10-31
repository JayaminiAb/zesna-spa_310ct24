import { Component } from '@angular/core';
import { User } from '../../core/user';
import { Company } from '../../../petty_cash/core/petty-cash';
import { OverallCookies } from 'src/app/demo/core/overall-cookies';
import { OverallCookieModel } from 'src/app/demo/model/zesna-cookie-model';
import { ZesnaEstateModel } from 'src/app/demo/model/zesna-estate-model';
import { ZesnaCommonService } from 'src/app/demo/service/zesna-services/zesna-common.service';
import { EstateDetails } from 'src/app/demo/core/estate/estate-details';
import { UserDetails } from 'src/app/demo/core/user/user-details';
import { ZesnaUserModel } from 'src/app/demo/model/zesna-user-model';
import { ZesnaUserService } from 'src/app/demo/service/zesna-services/zesna-user.service';
import { Filter } from 'src/app/demo/core/filter';
import { DEV_STATE } from 'src/app/demo/core/api-configs';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrl: './user-main.component.scss'
})
export class UserMainComponent {


  displayUserSlider: boolean = false;
  editingUser: boolean = false;
  // Store the cookie interface
  overallCookieInterface: OverallCookies;
  //Store logged user details
  loggedUserId: number = 0;
  loggedUserRole: string = '';
  //Store estate model
  zesnaEstateModel: ZesnaEstateModel;
  zesnaUserModel: ZesnaUserModel;
  estateList: EstateDetails[] = [];
  selectedEstate: EstateDetails = {
    Id: 0,
    Name: '',
    AddressDetails: '',
    ContactNumber: '',
    OtherDetails: '',
    Balance: 0,
    Total: 0
  };
  usersDetails: UserDetails[] = [];
  filter: Filter = {
    CurrentPage: 1,
    RecordsPerPage: 10,
    SearchQuery: '',
    SortAsc: true,
    SortCol: 'Name'

  }
  selectedUserDetails: UserDetails = {
    Email: '',
    Fullname: '',
    Id: 0,
    IsActive: true,
    Password: '',
    Total: 0,
    UserRoleDetails: { Id: 0, Name: '' }
  };
  runningMode = DEV_STATE;
  constructor(private _zesnaCommonService: ZesnaCommonService, private _zesnaUserService: ZesnaUserService) {
    this.zesnaEstateModel = new ZesnaEstateModel(this._zesnaCommonService);
    this.zesnaUserModel = new ZesnaUserModel(this._zesnaUserService);
    this.overallCookieInterface = new OverallCookieModel();
    this.loggedUserId = +this.overallCookieInterface.GetUserId();
    this.loggedUserRole = this.overallCookieInterface.GetUserRole();

  }
  ngOnDestroy() {
    // Unsubscribe all

    this.zesnaEstateModel.UnsubscribeAll();
    this.zesnaUserModel.UnsubscribeAll();
  }

  ngOnInit(): void {
    if(this.runningMode != 'TESTING'){
      this.getEstateListByUserId();
    }
    
    
  }

  getEstateListByUserId() {
    this.zesnaEstateModel.GetAllEstateDetails(this.loggedUserId).then(
      (data) => {
        if (data) {
          this.estateList = data;
          this.selectedEstate = this.deep(this.estateList[0]);
          this.getEstateSystemUsersPG();
        }
      }
    );
  }

  getEstateSystemUsersPG() {
    this.zesnaUserModel.GetAllUserInfoDetailsWithPG(this.filter, this.selectedEstate.Id).then(
      (data) => {
        if (data) {
          this.usersDetails = <UserDetails[]>data;
        }
      }
    );
  }

  setUserDetails(type: string) {
    this.zesnaUserModel.SetUserInfoDetails(this.selectedUserDetails, this.selectedEstate.Id, type).then(
      (data) => {
        this.selectedUserDetails = this.deep({
          Email: '',
          Fullname: '',
          Id: 0,
          IsActive: true,
          Password: '',
          Total: 0,
          UserRoleDetails: { Id: 0, Name: '' }
        });
      }
    );
  }

  onCompanyChange(event: any) {
    // Fetch and filter petty cash history based on the selected company

    this.getEstateSystemUsersPG();
  }




  hideUserSlider(): void {
    this.displayUserSlider = false;
  }

  saveUser(type: string): void {
    this.setUserDetails(type);
    this.hideUserSlider();
  }
  showSlider(): void {
    this.displayUserSlider = true;
    this.editingUser = false;
  }

  addNewUser() {
    this.editingUser = true;
    this.selectedUserDetails = {
      Email: '',
      Fullname: '',
      Id: 0,
      IsActive: true,
      Password: '',
      Total: 0,
      UserRoleDetails: { Id: 0, Name: '' }
    };
    this.showSlider();
  }
  viewUser(user: UserDetails): void {
    this.editingUser = true;
    this.selectedUserDetails = { ...user };
    // Implement view logic here
    this.showSlider();
  }

  editUser(user: UserDetails): void {
    this.editingUser = true;
    this.selectedUserDetails = { ...user };
    this.displayUserSlider = true;
  }

  deleteUser(user: UserDetails, type: string): void {
    this.selectedUserDetails = this.deep(user);
    this.setUserDetails(type);

  }

  // Making a deep copy
  deep<T extends any>(source: T): T {
    return JSON.parse(JSON.stringify(source));
  }
}
