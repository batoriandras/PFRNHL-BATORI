import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Service } from '../service';

@Component({
  selector: 'app-services-list',
  standalone: false,
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.sass'
})
export class ServicesListComponent {
  serviceTemp: Service = new Service()

  constructor(private router: Router, public servService: ServiceService) { }

  edit(service: Service): void {
    this.serviceTemp = service
    service.editMode = true
  }

  redirect():void{
    this.router.navigate(["services/create"])
  }
  save(service: Service): void {
    service.editMode = false
    this.servService.update(service)
  }

  cancelEdit(service: Service) {
    service.editMode = false
  }

  remove(service: Service): void {
    this.servService.deleteService(service)
  }
}
