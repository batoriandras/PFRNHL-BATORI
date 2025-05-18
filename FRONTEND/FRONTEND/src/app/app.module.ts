import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { OrderTableComponent } from './order-table/order-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicesListComponent,
    OrdersListComponent,
    EmployeesListComponent,
    ServiceCreateComponent,
    NavbarComponent,
    FooterComponent,
    OrderTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
