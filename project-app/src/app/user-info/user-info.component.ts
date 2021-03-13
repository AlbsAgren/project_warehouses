/**
 * Component for displaying details of logged-in user as well as providing logout functionality
 */
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  username: string = "";
  personname: string = "";

  @Output()
  logoutEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private auth: AuthService) { }

  /**
   * Get user details on init
   */
  ngOnInit(): void {
    this.auth.getUserDetails().subscribe(res => {
      this.username = res.username;
      this.personname = res.personname;
    });
  }

  /**
   * Log user out, emit event to allow user-dashboard to display login-box instead
   */
  logOut() {
    this.auth.logOut();

    this.logoutEvent.emit();
  }
}
