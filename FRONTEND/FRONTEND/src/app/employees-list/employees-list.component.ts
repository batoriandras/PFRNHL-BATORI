import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.sass'
})
export class EmployeesListComponent {
  constructor(private http: HttpClient, public empService: EmployeeService){}
}
