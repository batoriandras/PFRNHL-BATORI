import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiBaseUrl: string = "https://localhost:7183/api/Services"

  constructor(private http: HttpClient) {}

  getAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiBaseUrl)
  }

  getById(id: string): Observable<Service> {
    return this.http.get<Service>(`${this.apiBaseUrl}/${id}`)
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiBaseUrl, service)
  }

  update(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiBaseUrl}/${service.id}`, service)
  }

  delete(service: Service): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${service.id}`)
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
      this.create(service).subscribe({
        next: created => console.log('Seeded:', created),
        error: err => console.error('Seed error:', err)
      })
    })
  }
}
