import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicesListComponent } from './services-list/services-list.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { ServiceCreateComponent } from './service-create/service-create.component';

const routes: Routes = [
  {path:"",redirectTo:"services",pathMatch:"full"},
  {path:"services", component: ServicesListComponent},
  {path:"employees", component: EmployeesListComponent},
  {path:"orders", component: OrdersListComponent},
  {path:"servicecreate", component: ServiceCreateComponent},
  {path:"**",redirectTo:"services",pathMatch:"full"}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
