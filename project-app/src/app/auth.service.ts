/**
 * Service for providing authentication functionality
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'https://warehouses-project-alag1901.herokuapp.com/login';

  constructor(private http: HttpClient) { }

  /**
   * Attempt to login user
   * @param user the user credentials
   * @return, an observable of the request to which the client component can subscribe
   */
  public logIn(user: any) {
    return this.http.post<any>(this.url + '/authenticate', user, { "withCredentials": true });
  }
  
  /**
   * Log out the current user
   */
  public logOut() {
    this.http.delete<any>(this.url + '/authenticate', { "withCredentials": true })
      .subscribe(res => {
        localStorage.setItem('loggedIn', 'false');
      })
  }

  /**
   * Query the server as to whether the user is currently logged in
   * @return, a boolean observable of the request
   */
  public isLoggedInAsync(): Observable<boolean> {
    return this.http.get<any>(this.url + '/authenticate', { "withCredentials": true })
      .pipe(map(data => data.loggedIn));
  }

  /**
   * Query the server for full user details
   * @return, an observable of the request
   */
  public getUserDetails() {
    return this.http.get<any>(this.url + '/authenticate', { "withCredentials": true });
  }

    /**
   * Query the server as to whether the user is currently logged in
   * @param user the new user credentials
   * @return, an observable of the request
   */
  public addUser(user: Object) {
    return this.http.post<any>(this.url + '/new', user, { "withCredentials": true });
  }
}
