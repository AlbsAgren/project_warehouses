/**
 * Component for displaying the details of a single product and allowing the user
 * to delete it
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};
  productCode: Number = 0;

  constructor(private activatedRoute: ActivatedRoute, private backend: BackendService, private router: Router) { }

  /**
   * Get data on page init
   */
  ngOnInit(): void {
    // get product code from route
    this.activatedRoute.params.subscribe(params => {
      this.productCode = params['productCode'];
    })
    // get product data from backend
    this.backend.getProduct(this.productCode).subscribe(res => {
      this.product = res;
    }, err => {
      console.error(err);
    });
  }

  /**
   * Delete the product specified by the product code
   * @param productCode the code of the product to delete
   */
  deleteProduct(productCode: number) {
    this.backend.deleteProduct(productCode).subscribe(res => {
      alert('Product deleted');
      this.router.navigate(['/overview']);
    }, err => {
      alert('An error has occurred, product may not be deleted');
      console.error(err);
    });
  }
}
