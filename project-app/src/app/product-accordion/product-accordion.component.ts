/**
 * Accordion component that allows the stock of a single warehouse to be expanded
 * by clicking on it
 */
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product-accordion',
  templateUrl: './product-accordion.component.html',
  styleUrls: ['./product-accordion.component.css']
})
export class ProductAccordionComponent {

  @Input() warehouse: any;

  opened: boolean = false;  // boolean to toggle accordion

  constructor(private router: Router, private auth: AuthService) { }

  /**
   * Navigates to the product specified by the product code
   * @param productCode the code of the product to navigate to
   */
  toProduct(productCode: number) {
    // verify user is logged in
    this.auth.isLoggedInAsync().subscribe(res => {
      if(res === true) {
        this.router.navigate(['/products/' + productCode]);
      } else {
        alert('You must be logged in to access this page.');
      }
    });
  }

  /**
   * Navigates to the warehouse specified by the warehouse name
   * @param name the warehouse name
   */
  toWarehouse(name: String) {
    this.auth.isLoggedInAsync().subscribe(res => {
      if(res === true) {
        this.router.navigate(['/warehouses/' + name]);
      } else {
        alert('You must be logged in to access this page.');
      }
    });
  }
}
