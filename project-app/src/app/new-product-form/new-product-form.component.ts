/**
 * Component for allowing the user to add new product to the system
 */
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-new-product-form',
  templateUrl: './new-product-form.component.html',
  styleUrls: ['./new-product-form.component.css']
})
export class NewProductFormComponent {
  // Form group for taking user input
  productForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl(''),
    color: new FormControl(''),
    material: new FormControl(''),
    department: new FormControl(''),
    manufacturer: new FormControl(''),
  });

  constructor(private backend: BackendService, private router: Router) { }

  /**
   * Method for adding a new product to the system, called when the user submits the
   * new product form
   */
  addProduct() {
    this.backend.addProduct(this.productForm.value).subscribe(res => {
      alert('Product added.');
      this.router.navigate(['overview']);
    });
  }

  /**
   * Method that allows angular access to the current value of the name variable in the form
   * used for the expression: "*ngIf="name && name.invalid"
   */
  get name() {
    return this.productForm.get('name');
  }
}
