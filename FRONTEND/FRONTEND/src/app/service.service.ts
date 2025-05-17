import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  services: Service[] = []
  localdbname: string = "local_services"
  apiBaseUrl: string = "https://localhost:7183"
  constructor(private http: HttpClient) {
    this.loadServices()
   }

  loadServices(): void{
    this.http.get<Service[]>(this.apiBaseUrl+"/api/Services").subscribe(data=>{
      this.services=data
    })
  }
}
