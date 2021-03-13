/**
 * Main app component
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-app';

  constructor(private router: Router) { }

  /**
   * Navigates to the destination specified by target
   * @param target the destination path
   */
  navTo(target: string) {
    this.router.navigate([target]);
  }
}
