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
    this.serService.loadAll();

    this.serService.services$.subscribe(services => {
      if (services.length > 0) {
        this.services = services;

        this.serviceForm = new FormGroup(
          Object.fromEntries(
            services.map(service => [service.id, new FormControl(false)])
          )
        );

        this.formReady = true;
      }
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
        console.log('Frissítve:', data)
        this.router.navigate(["/employees"])
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err);
      }
    })
  }
}
