import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ServiceService } from '../service.service';
import { Service } from '../service';
import moment from 'moment';

@Component({
  selector: 'app-employee-edit',
  standalone: false,
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.sass'
})

export class EmployeeEditComponent implements OnInit{
   employee: Employee = new Employee();
  services: Service[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService,
    public serService: ServiceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.empService.employees.find(e => e.id === id);
      if (found) {
        this.employee = new Employee(found);
        // Ensure proper date object
        if (!(this.employee.dateOfEmployment instanceof Date)) {
          this.employee.dateOfEmployment = new Date(this.employee.dateOfEmployment);
        }
      }
    }

    this.services = this.serService.services;
  }

  isServiceChecked(serviceId: string): boolean {
    return this.employee.services?.some(s => s.id === serviceId) ?? false;
  }

  onServiceToggle(service: Service, event: any): void {
    if (event.target.checked) {
      if (!this.employee.serviceIDs.includes(service.id)) {
        this.employee.serviceIDs.push(service.id);
      }
    } else {
      this.employee.serviceIDs = this.employee.serviceIDs.filter(id => id !== service.id);
    }
  }

  getDateString(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
  }

  onDateChange(event: any): void {
    this.employee.dateOfEmployment = new Date(event.target.value);
  }

  save(): void {
    this.empService.update(this.employee);
    this.router.navigate(['/employees']);
  }
}
