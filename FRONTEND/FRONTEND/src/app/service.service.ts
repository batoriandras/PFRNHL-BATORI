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
    //this.seed()
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
  seed(): void {
    const services: Service[] = [
      {
        id: "",
        name: "Ablaküveg csere",
        description: "Betört vagy repedt ablaküveg gyors és szakszerű cseréje.",
        editMode: false
      },
      {
        id: "",
        name: "Egyedi tükör készítés",
        description: "Méretre szabott, fazettás vagy sima tükrök gyártása és felszerelése.",
        editMode: false
      },
      {
        id: "",
        name: "Zuhanykabin üvegezés",
        description: "Egyedi méretű, edzett üveg zuhanykabinok tervezése és kivitelezése.",
        editMode: false
      },
      {
        id: "",
        name: "Üvegkorlát kivitelezés",
        description: "Beltéri és kültéri biztonsági üvegkorlátok gyártása és beépítése.",
        editMode: false
      },
      {
        id: "",
        name: "Kirakatüveg csere",
        description: "Üzlethelyiségek kirakatüvegeinek cseréje és javítása rövid határidővel.",
        editMode: false
      },
      {
        id: "",
        name: "Üvegpolc készítés",
        description: "Dekoratív és funkcionális üvegpolcok tervezése és beépítése.",
        editMode: false
      },
      {
        id: "",
        name: "Üvegasztal gyártás",
        description: "Modern üvegasztalok egyedi méretben és formában.",
        editMode: false
      },
      {
        id: "",
        name: "Belső válaszfalak üvegből",
        description: "Irodákba és otthonokba tervezett átlátszó vagy matt üveg válaszfalak.",
        editMode: false
      },
      {
        id: "",
        name: "Biztonsági üvegezés",
        description: "Betörésgátló és hőálló üvegek beépítése fokozott védelem érdekében.",
        editMode: false
      },
      {
        id: "",
        name: "Homokfúvott üveg dekoráció",
        description: "Díszített, homokfúvott mintás üvegek készítése egyedi igények szerint.",
        editMode: false
      }
    ];

    services.forEach(service => {
      this.create(service)
      console.log(service);
    });
  }
}
