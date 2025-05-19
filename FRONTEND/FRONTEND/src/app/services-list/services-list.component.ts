import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';
import { Service } from '../service';

@Component({
  selector: 'app-services-list',
  standalone: false,
  templateUrl: './services-list.component.html',
  styleUrl: './services-list.component.sass'
})
export class ServicesListComponent implements OnInit {
  serviceTemp: Service = new Service()
  services: Service[] = []

  constructor(private router: Router, public servService: ServiceService) { }

  ngOnInit(): void {
    this.servService.getAll().subscribe({
      next: data => this.services = data,
      error: err => console.log(err)
    })
  }

  edit(service: Service): void {
    this.serviceTemp = service
    service.editMode = true
  }

  redirect(): void {
    this.router.navigate(["services/create"])
  }

  updateService(service: Service): void {
    service.editMode = false
    this.servService.update(service).subscribe({
      next: data => {
        let index = this.services.findIndex(x => x.id === service.id)
        this.services[index] = service
        console.log('Frissítve:', data);
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err);
      }
    })
  }

  cancelEdit(service: Service) {
    service.editMode = false
  }

  deleteService(service: Service): void {
    this.servService.delete(service).subscribe({
      next: () => {
        this.services = this.services.filter(x => x.id !== service.id)
        console.log('Sikeresen törölve:', service)
      },
      error: err => {
        console.error('Hiba történt a törlés során:', err)
      }
    })
  }
}
