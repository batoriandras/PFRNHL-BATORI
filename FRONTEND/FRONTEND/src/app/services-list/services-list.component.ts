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
  constructor(private router: Router, public servService: ServiceService){}

    remove(service: Service): void {
    this.servService.deleteService(service.id).subscribe({
      next: () => {
        console.log('Szolgáltatás törölve');
        // Frissítsd a listát vagy állapotot
      },
      error: err => {
        console.error('Hiba a törléskor:', err);
      }
    });
  }
}
