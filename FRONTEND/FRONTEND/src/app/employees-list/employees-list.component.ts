import { Component, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';
import { Service } from '../service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.sass'
})
export class EmployeesListComponent {
  serviceModalOpen: boolean = false;
  selectedService?: Service;

  constructor(private router: Router, public empService: EmployeeService) { }

  edit(employee: Employee):void{
    this.router.navigate(["/employees/edit/"+employee.id])
  }

  remove(employee: Employee): void{
    this.empService.delete(employee)
  }

  openServiceModal(service: Service) {
    this.selectedService = service;
    this.serviceModalOpen = true;
  }

  closeServiceModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.serviceModalOpen = false;
    this.selectedService = undefined;
  }
}
