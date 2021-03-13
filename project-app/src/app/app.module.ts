import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackendService } from './backend.service';
import { OrderByPipe } from './order-by.pipe';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseDetailsComponent } from './warehouse-details/warehouse-details.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductAccordionComponent } from './product-accordion/product-accordion.component';
import { LoginBoxComponent } from './login-box/login-box.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthService } from './auth.service';
import { NewProductFormComponent } from './new-product-form/new-product-form.component';
import { NewUserComponent } from './new-user/new-user.component';

@NgModule({
  declarations: [
    AppComponent,
    OrderByPipe,
    WarehouseListComponent,
    WarehouseDetailsComponent,
    ProductDetailsComponent,
    ProductAccordionComponent,
    LoginBoxComponent,
    UserDashboardComponent,
    UserInfoComponent,
    NewProductFormComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BackendService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
