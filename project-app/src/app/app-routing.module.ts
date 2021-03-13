import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailsComponent } from './product-details/product-details.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { LoginGuard } from './login.guard';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/overview', pathMatch: 'full' },
  { path: 'overview', component: WarehouseListComponent },
  { path: 'warehouses/:name', component: WarehouseDetailsComponent, canActivate: [LoginGuard] },
  { path: 'products/:productCode', component: ProductDetailsComponent, canActivate: [LoginGuard] },
  { path: 'add-product', component: NewProductFormComponent, canActivate: [LoginGuard] },
  { path: 'add-user', component: NewUserComponent, canActivate: [LoginGuard] },
  { path: '**', redirectTo: '/overview' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
