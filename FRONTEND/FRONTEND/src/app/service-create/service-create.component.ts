import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Service } from '../service';
import { ServiceService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-create',
  standalone: false,
  templateUrl: './service-create.component.html',
  styleUrl: './service-create.component.sass'
})
export class ServiceCreateComponent {
  service: Service = new Service()
  serviceForm: FormGroup;

  constructor(private http: HttpClient, public serService: ServiceService, private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  create(): void {
    if (this.serviceForm.valid) {
      this.service = this.serviceForm.value
      this.serService.create(this.service)
    }
  }
}
