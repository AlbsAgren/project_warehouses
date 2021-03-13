/**
 * Implementation of the CanActivate interface for use with the router to
 * prevent unauthenticated users from accessing restricted routes
 */
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) { }

  /**
   * Method to determine if the route can be activated by the user
   * @param route information about the route
   * @param state the state of the router
   * @return, a boolean indicating if the user can activate the route
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // get login status from local storage
      let loggedIn = localStorage.getItem('loggedIn');

      // if user is logged in, return true, if not, navigate back to home
      if(loggedIn && loggedIn === 'true') {
        return true;
      } else {
        alert('You must be logged in to view that page.');
        this.router.navigate(['/']);
        return false;
      }
  }
}

