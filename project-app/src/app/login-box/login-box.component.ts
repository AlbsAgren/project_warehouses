/**
 * Component representing a form allowing the user to log in
 */

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  templateUrl: './login-box.component.html',
  styleUrls: ['./login-box.component.css']
})
export class LoginBoxComponent {
  // angular form group with some basic validation
  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)     
    ])
  })

  @Output()
  loginEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  /**
   * Fires when the user clicks the log in button, emits the entered
   * credentials to the user-dashboard component for authentication
   */
  attemptLogin() {
    this.loginEvent.emit(this.loginForm.value);
  }
}
