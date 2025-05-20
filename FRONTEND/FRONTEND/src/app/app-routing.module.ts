import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';
import { OrderCreateComponent } from './order-create/order-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path:"",redirectTo:"services",pathMatch:"full"},
  {path:"services", component: ServicesListComponent},
  {path:"employees", component: EmployeesListComponent},
  {path:"orders", component: OrdersListComponent},
  {path:"services/create", component: ServiceCreateComponent},
  {path:"orders/create", component: OrderCreateComponent},
  {path:"employees/edit/:id", component: EmployeeEditComponent},
  {path:"employees/create",component: EmployeeCreateComponent},
  {path:"dashboard",component: DashboardComponent},
  {path:"**",redirectTo:"services",pathMatch:"full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
