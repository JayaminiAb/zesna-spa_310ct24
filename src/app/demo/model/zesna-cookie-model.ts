import { CookieObject } from "../core/cookie-object";
import { OverallCookies } from "../core/overall-cookies";


import jwt_decode from 'jwt-decode';

export class OverallCookieModel implements OverallCookies {
    // Readonly params for cookie name
    readonly COOKIE_NAME_PART_1 = 'AWSCOA';
    readonly COOKIE_NAME_PART_2 = 'AWSCOB';
    // Store cookie object
    cookieObject: CookieObject;

    // Constructor
    constructor() {
        // Initialize the object
        this.cookieObject = {
            UserToken: '',
            LoggedUserEmail: '',
            LoggedUserFullName: '',
            LoggedUserId: '',
            LoggedUserRole: '',
            InitialToken: ''
        };
        // End of Initialize the object
    }
    

    // Setting the user token
    SetUserToken(userToken: string) {
        // Validate the cookie object
        this.ValidateCookie();
        // Setting the user token
        this.cookieObject.UserToken = userToken;
        // Decode the token
        let decodedToken = this.getDecodedAccessToken(userToken);
        // Setting the user full name
        this.cookieObject.InitialToken = decodedToken['aud'];
        // Setting the user full name
        this.cookieObject.LoggedUserFullName = decodedToken['acr'];
        // Setting the user email
        this.cookieObject.LoggedUserEmail = decodedToken['email'];
        // Setting the user id
        this.cookieObject.LoggedUserId = decodedToken['nameid'];
        
        // Setting the user role
        this.cookieObject.LoggedUserRole = decodedToken['amr'];
        // Setting the user role name
        this.cookieObject.LoggedUserRole = decodedToken['azp'];
        // Store the cookie details
        this.StoreCookie();
    }

    // Method to store the cookie
    private StoreCookie() {
        // Encrypt the object
        let encryptedObject = btoa(JSON.stringify(this.cookieObject));
        // Break the string into two parts
        let encryptedStringPartA = encryptedObject.substring(0, (encryptedObject.length / 2));
        let encryptedStringPartB = encryptedObject.substring((encryptedObject.length / 2));

        // Save the encrypted part A in the local storage
        localStorage.setItem(this.COOKIE_NAME_PART_1, encryptedStringPartA);
        localStorage.setItem(this.COOKIE_NAME_PART_2, encryptedStringPartB);
    }

    // Method to validate the cookie
    private ValidateCookie() {
        // Getting the local storage part 1
        let localStoragePartA = localStorage.getItem(this.COOKIE_NAME_PART_1);
        let localStoragePartB = localStorage.getItem(this.COOKIE_NAME_PART_2);

        // Check if the cookie exists
        if (localStoragePartA && localStoragePartB) {
            // Decrypt the cookie part 1
            let decryptedStoragePartA = <string>localStoragePartA;
            let decryptedStoragePartB = <string>localStoragePartB;

            // Getting the object
            let cookieObject = <CookieObject>JSON.parse(atob(decryptedStoragePartA + decryptedStoragePartB));

            // Setting the object
            this.cookieObject = cookieObject;
        }
        // End of Check if the cookie exists
    }

    // Decode the token details
    private getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        }
        catch (Error) {
            return null;
        }
    }

    // Getting the user token
    GetUserToken() {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the user token
        return this.cookieObject.UserToken;
    }

    // Getting the user full name
    GetUserFullName() {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the value
        return this.cookieObject.LoggedUserFullName;
    }

    // Getting the user ID
    GetUserId() {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the value
        return this.cookieObject.LoggedUserId;
    }

    // Getting the user email
    GetUserEmail() {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the value
        return this.cookieObject.LoggedUserEmail;
    }

   
    GetUserRole(): string {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the value
        return this.cookieObject.LoggedUserRole;
    }
    GetUserInitialToken(): string {
        // Validate the cookie object
        this.ValidateCookie();
        // Return the value
        return this.cookieObject.InitialToken;
    }

    // Clearing the data from the local storage
    ClearCookies() {
        // Clearing the local storage
        localStorage.removeItem(this.COOKIE_NAME_PART_1);
        localStorage.removeItem(this.COOKIE_NAME_PART_2);
    }
}