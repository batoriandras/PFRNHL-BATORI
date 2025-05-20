import { Component, Input, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';
import { Service } from '../service';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.sass'
})
export class EmployeesListComponent implements OnInit {
  serviceModalOpen: boolean = false
  selectedService?: Service
  employees: Employee[] = []
  employees$!: Observable<Employee[]>

  constructor(private router: Router, public empService: EmployeeService) { }

  ngOnInit(): void {
    this.empService.loadAll().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })
    
    this.empService.employees$.subscribe(employees=>{
      this.employees = employees
    })
  }

  edit(employee: Employee):void{
    this.router.navigate(["/employees/edit/"+employee.id])
  }

  deleteEmployee(employee: Employee): void {
    this.empService.delete(employee).subscribe({
      next: () => {
        this.employees = this.employees.filter(x => x.id !== employee.id)
        console.log('Sikeresen törölve:', employee)
      },
      error: err => {
        console.error('Hiba történt a törlés során:', err)
      }
    })
  }

  openServiceModal(service: Service) {
    this.selectedService = service
    this.serviceModalOpen = true
  }


  closeServiceModal(event?: MouseEvent) {
    if (event) {
      event.stopPropagation()
    }
    this.serviceModalOpen = false
    this.selectedService = undefined
  }
}
