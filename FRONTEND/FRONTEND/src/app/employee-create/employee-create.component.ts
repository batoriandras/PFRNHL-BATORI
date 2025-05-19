import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { ServiceService } from '../service.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Service } from '../service';

@Component({
  selector: 'app-employee-create',
  standalone: false,
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.sass'
})
export class EmployeeCreateComponent implements OnInit {
  employee: Employee = new Employee()
  services: Service[] = []
  serviceForm: FormGroup = new FormGroup({})
  formReady: boolean = false

  constructor(public empService: EmployeeService, private router: Router, public serService: ServiceService) {
  }

  ngOnInit(): void {
    this.serService.getAll().subscribe((data: Service[]) => {
      this.services = data;
      
      const formControls: { [key: string]: FormControl } = {};
      for (let service of this.services) {
        formControls[service.id] = new FormControl(false);
      }

      this.serviceForm = new FormGroup(formControls);
      this.formReady = true;
    });
  }

  get SelectedValues() {
    return Object.keys(this.serviceForm.value).filter(key => this.serviceForm.value[key])
  }

  trackById(index: number, service: Service): string {
    return service.id;
  }

  save(): void {
    this.employee.serviceIDs = this.SelectedValues
    this.empService.create(this.employee).subscribe({
      next: data => {
        console.log('Frissítve:', data);
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err);
      }
    })
    this.router.navigate(["/employees"])
  }
}
