/**
 * Component for handling login functionality, displays a login box if not authenticated, or user info
 * if user is logged in
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // variable to display different component if user is logged in
  loggedIn: boolean = false;

  constructor(private auth: AuthService, private router: Router) { }

  /**
   * Get login status on component init
   */
  ngOnInit(): void {
    this.auth.isLoggedInAsync().subscribe(res => {
      if(res === true) {
        this.loggedIn = true;
        localStorage.setItem('loggedIn', 'true');
      } else {
        this.loggedIn = false;
        localStorage.setItem('loggedIn', 'false');
      }
    });
  }

  /**
   * Attempt to log in user
   * @param user the user credentials
   */
  attemptLogin(user: any) {
    this.auth.logIn(user).subscribe(res => {
      if(res.loggedIn === true) {
        this.loggedIn = true;
        // save info to local storage for login guard
        localStorage.setItem('loggedIn', 'true');
      } else {
        alert('Login failed, check credentials');
        this.loggedIn = false;
        localStorage.setItem('loggedIn', 'false');
      }
    }, err => {
      alert('Login failed, check credentials');
      this.loggedIn = false;
      localStorage.setItem('loggedIn', 'false');
      console.error(err);
    });
  }

  /**
   * Log out user
   */
  logOut() {
      this.loggedIn = false;
      localStorage.setItem('loggedIn', 'false');
      this.router.navigate(['/']);  // always navigate to home on logout
  }
}
