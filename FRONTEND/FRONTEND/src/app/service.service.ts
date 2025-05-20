import { Injectable } from '@angular/core';
import { Service } from './service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiBaseUrl = "https://localhost:7183/api/Services";

  private servicesSubject = new BehaviorSubject<Service[]>([]);
  services$ = this.servicesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadAll().subscribe()
    //this.seed() //order és employee nem seedel services seed nélkül!
  }

  loadAll(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiBaseUrl).pipe(
      tap(data => this.servicesSubject.next(data))
    )
  }

  create(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiBaseUrl, service).pipe(
      tap(created => {
        const current = this.servicesSubject.value
        this.servicesSubject.next([...current, created])
      })
    )
  }

  update(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiBaseUrl}/${service.id}`, service).pipe(
      tap(updated => {
        const current = this.servicesSubject.value
        const index = current.findIndex(s => s.id === updated.id)
        if (index !== -1) {
          current[index] = updated
          this.servicesSubject.next([...current]);
        }
      })
    )
  }

  delete(service: Service): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${service.id}`).pipe(
      tap(() => {
        const current = this.servicesSubject.value.filter(s => s.id !== service.id);
        this.servicesSubject.next(current);
      })
    )
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
      this.create(service).subscribe()
    })
  }
}
