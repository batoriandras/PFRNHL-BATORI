import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  services: Service[] = []
  localdbname: string = "local_services"
  apiBaseUrl: string = "https://localhost:7183/api/Services"
  constructor(private http: HttpClient) {
    this.loadServices()
  }

  loadServices(): void {
    this.http.get<Service[]>(this.apiBaseUrl).subscribe(data => {
      this.services = data
    })
  }

  create(service: Service): void {
    this.http.post(this.apiBaseUrl, service).subscribe({
      next: (response) => {
        console.log(response)
        this.services.push(service)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
    update(service: Service): void {
    this.http.put(this.apiBaseUrl+'/'+service.id, service).subscribe({
      next: (response) => {
        console.log(response)
        let index = this.services.findIndex(x => x.id === service.id)
        this.services[index] = service
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteService(service: Service): void{
    this.http.delete(this.apiBaseUrl+'/'+service.id).subscribe({
      next: (response) => {
        console.log(response)
        this.services = this.services.filter(x=>x.id!==service.id)
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
