import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Service } from '../service';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-create',
  standalone: false,
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.sass'
})
export class ServiceCreateComponent {
  service: Service = new Service()

  constructor(
    public serService: ServiceService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  create(): void {
    this.serService.create(this.service)
    this.router.navigate(["services"])
  }
}
