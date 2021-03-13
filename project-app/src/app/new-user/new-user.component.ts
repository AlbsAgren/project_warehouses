/**
 * Component for allowing logged-in user to add new user accounts
 */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  // Form for taking user input, validators to match the requirements in the backend
  userForm = new FormGroup({
    personname: new FormControl('', [Validators.required]),
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
  });

  constructor(private auth: AuthService) { }

  /**
   * Attempts to add user to system, and informs user of the result
   */
  addUser() {
    this.auth.addUser(this.userForm.value).subscribe(res => {
      alert('User successfully added');
    }, err => {
      alert('Failed to add user, error: ' + err.error.message);
    });
  }

  /**
   * Get the value of the form username field
   */
  get username() {
    return this.userForm.get('username');
  }

  /**
   * Get the value of the form password field
   */
  get password() {
    return this.userForm.get('password');
  }
}
