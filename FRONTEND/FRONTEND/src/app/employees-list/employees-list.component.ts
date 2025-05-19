import { Component, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';
import { Service } from '../service';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.sass'
})
export class EmployeesListComponent {
  @Input() employee!: Employee;

  serviceModalOpen: boolean = false;
  selectedService?: Service;
  constructor(public empService: EmployeeService) { }

  edit(employee: Employee):void{

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
