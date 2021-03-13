/**
 * Component for displaying the main overview with all the warehouses in the system 
 */
import { Component, OnInit } from '@angular/core';

import { BackendService } from '../backend.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.css']
})
export class WarehouseListComponent implements OnInit {
  
  warehouseArray: any[] = [];

  constructor(private backend: BackendService) { }

  /**
   * Get all warehouses and associated product data on init
   */
  ngOnInit(): void {
    this.backend.getAllWarehouses().subscribe(res => {
      this.warehouseArray = res;
    });
  }
}
