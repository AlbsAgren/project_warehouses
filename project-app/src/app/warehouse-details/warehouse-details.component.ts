/**
 * Component for displaying detailed information about a warehouse and allowing users
 * to update the stock of the products contained within
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { BackendService } from '../backend.service';


@Component({
  selector: 'app-warehouse-details',
  templateUrl: './warehouse-details.component.html',
  styleUrls: ['./warehouse-details.component.css']
})
export class WarehouseDetailsComponent implements OnInit {

  warehouse: any = {};
  name: string = "";

  constructor(private activatedRoute: ActivatedRoute, private backend: BackendService) { }

  /**
   * Get warehouse data on init
   */
  ngOnInit(): void {
    // get warehouse name from route
    this.activatedRoute.params.subscribe((params:Params) => {
      this.name = params['name'];
    })
    // get data
    this.backend.getWarehouse(this.name).subscribe((res: any) => {
      this.warehouse = res;
    }, (error: any) => {
      console.error(error);
    });
  }

  /**
   * Updates the stock of a product in the warehouse
   * @param value the new stock amount
   * @param id the id of the product to be updated
   */
  updateStock(value: string, id: string) {
    const body = {
      id: id,
      stock: Number(value)
    }

    this.backend.updateWarehouse(this.name, body).subscribe((res: any) => {
      // update warehouse with new stock
      this.backend.getWarehouse(this.name).subscribe((res: any) => {
        this.warehouse = res;
        alert('Stock updated');
      }, (error: any) => {
        console.error(error);
      });
    }, (error: any) => {
      console.error(error);
    });
  }
}
