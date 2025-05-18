import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = []
  localdbname: string = "local_employees"
  apiBaseUrl: string = "https://localhost:7183/api/Employee"
  constructor(private http: HttpClient) {
    this.loadEmployees()
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(this.apiBaseUrl).subscribe(data => {
      this.employees = data
    })
  }

  create(employee: Employee): void {
    this.http.post(this.apiBaseUrl, employee).subscribe({
      next: (response) => {
        console.log(response)
        this.employees.push(employee)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
    update(employee: Employee): void {
    this.http.put(this.apiBaseUrl+'/'+employee.id, employee).subscribe({
      next: (response) => {
        console.log(response)
        let index = this.employees.findIndex(x => x.id === employee.id)
        this.employees[index] = employee
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  delete(employee: Employee): void{
    this.http.delete(this.apiBaseUrl+'/'+employee.id).subscribe({
      next: (response) => {
        console.log(response)
        this.employees = this.employees.filter(x=>x.id !== employee.id)
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
