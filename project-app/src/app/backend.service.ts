/**
 * A service for interacting with the server api
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  url = 'https://warehouses-project-alag1901.herokuapp.com/api';

  /**
   * Method for getting all warehouses and their complete inventory
   * @return, an observable of the request
   */
  getAllWarehouses() {
    return this.http.get<any>(this.url + '/warehouses');
  }

  /**
   * Method for getting a single warehouse by name
   * @param name the warehouse name
   * @return, an observable of the request
   */
  getWarehouse(name: String) {
    return this.http.get<any>(this.url + '/warehouses/' + name);
  }

  /**
   * Method for getting a single product by productCode
   * @param productCode the productCode
   * @return, an observable of the request
   */
  getProduct(productCode: Number) {
    return this.http.get<any>(this.url + '/products/' + productCode);
  }

  /**
   * Method for updating the stock of a product in the warehouse's inventory
   * @param name the name of the warehouse
   * @param body an object with the id of the product and the new stock value
   * @return, an observable of the request
   */
  updateWarehouse(name: string, body: any) {
    return this.http.put<any>(this.url + '/warehouses/' + name, body);
  }

  /**
   * Method for adding a new product
   * @param product an object with data for the new product
   * @return, an observable of the request
   */
  addProduct(product: any) {
    return this.http.post<any>(this.url + '/products/add', product);
  }

  /**
   * Method for deleting a single product by productCode
   * @param productCode the productCode
   * @return, an observable of the request
   */
  deleteProduct(productCode: number) {
    return this.http.delete<any>(this.url + '/products/' + productCode);
  }
}
