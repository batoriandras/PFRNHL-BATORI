import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ServiceService } from '../service.service';
import { Service } from '../service';
import moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-edit',
  standalone: false,
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.sass'
})

export class EmployeeEditComponent {
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
    this.empService.update(this.employee).subscribe({
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
