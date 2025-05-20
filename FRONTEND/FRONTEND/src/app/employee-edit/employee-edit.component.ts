import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { ServiceService } from '../service.service';
import { Service } from '../service';
import moment from 'moment';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

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

  constructor(public empService: EmployeeService, private router: Router, public serService: ServiceService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.serService.loadAll()
    this.empService.loadAll()

    this.empService.employees$.subscribe(employees => {
      this.route.params.subscribe(param => {
        this.employee = employees.filter(x => x.id == param["id"])[0]
      })
    })

    this.serService.services$.subscribe(services => {
      if (services.length > 0) {
        this.services = services

        this.serviceForm = new FormGroup(
          Object.fromEntries(
            services.map(service => [service.id, new FormControl(false)])
          )
        )
        this.buildForm()

        this.formReady = true
      }
    })
  }

  buildForm() {
    const group: { [key: string]: FormControl } = {}

    for (const service of this.services) {
      const isChecked = this.employee.services?.some(s => s.id === service.id) ?? false
      group[service.id] = new FormControl(isChecked)
    }
    this.serviceForm = new FormGroup(group)
    this.formReady = true
  }

  get SelectedValues() {
    return Object.keys(this.serviceForm.value).filter(key => this.serviceForm.value[key])
  }

  trackById(index: number, service: Service): string {
    return service.id
  }

  save(): void {
    this.employee.serviceIDs = this.SelectedValues
    this.empService.update(this.employee).subscribe({
      next: data => {
        console.log('Frissítve:', data)
        this.router.navigate(["/employees"])
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err)
      }
    })
  }
}
