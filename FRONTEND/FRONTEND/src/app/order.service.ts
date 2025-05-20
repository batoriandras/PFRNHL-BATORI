import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderCreateDto } from './order-create-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiBaseUrl: string = "https://localhost:7183/api/Order"

  private ordersSubject = new BehaviorSubject<Order[]>([])
  public orders$ = this.ordersSubject.asObservable()

  constructor(private http: HttpClient) {
    this.loadAll().subscribe()
    //this.seed()
  }

  loadAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiBaseUrl).pipe(
      tap(orders => this.ordersSubject.next(orders))
    )
  }

  dummyCreate(order: OrderCreateDto): Observable<Order> {
    return this.http.post<Order>(this.apiBaseUrl, order).pipe(
      tap(created => {
        const current = this.ordersSubject.value
        this.ordersSubject.next([...current, created])
      })
    )
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiBaseUrl, order).pipe(
      tap(created => {
        const current = this.ordersSubject.value
        this.ordersSubject.next([...current, created])
      })
    )
  }

  update(order: Order): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${order.id}`, { status: order.status }).pipe(
      tap(() => {
        const current = this.ordersSubject.value
        const index = current.findIndex(o => o.id === order.id)
        if (index !== -1) {
          current[index] = { ...current[index], status: order.status }
          this.ordersSubject.next([...current])
        }
      })
    )
  }

  delete(order: Order): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${order.id}`).pipe(
      tap(() => {
        const current = this.ordersSubject.value.filter(o => o.id !== order.id)
        this.ordersSubject.next(current)
      })
    )
  }

  seed(): void {
    const dummyOrders: OrderCreateDto[] = [
        {
          "serviceId": "f485a345-2446-4c09-b791-5299675f92b5",
          "description": "Konyhai ablak üvegének cseréje.",
          "orderDate": "2025-04-01",
          "dueDate": "2025-04-10",
          "status": "Pending",
          "address": "Budapest, Fő utca 12.",
          "phoneNumber": "+36 30 123 4567",
          "email": "ugyfel1@example.com"
        },
        {
          "serviceId": "21a886b3-e3bb-4afe-a48e-97947d2e9de9",
          "description": "Fürdőszobai tükör egyedi méretben.",
          "orderDate": "2025-04-05",
          "dueDate": "2025-04-15",
          "status": "Pending",
          "address": "Szeged, Tavasz utca 8.",
          "phoneNumber": "+36 70 234 5678",
          "email": "ugyfel2@example.com"
        },
        {
          "serviceId": "aaf721ff-7fb2-4187-a64a-f767b68132bb",
          "description": "Zuhanykabin üveg megrendelése új építéshez.",
          "orderDate": "2025-04-10",
          "dueDate": "2025-04-20",
          "status": "Pending",
          "address": "Debrecen, Nyár utca 15.",
          "phoneNumber": "+36 20 345 6789",
          "email": "ugyfel3@example.com"
        },
        {
          "serviceId": "577d4ca7-dd6d-47f5-8393-bb9696304a5b",
          "description": "Terem üvegkorlát kivitelezése.",
          "orderDate": "2025-04-15",
          "dueDate": "2025-04-25",
          "status": "Pending",
          "address": "Győr, Víz utca 20.",
          "phoneNumber": "+36 30 456 7890",
          "email": "ugyfel4@example.com"
        },
        {
          "serviceId": "1a4e038a-fd56-44f2-b34a-9109779bc941",
          "description": "Üzlet kirakatüveg cseréje.",
          "orderDate": "2025-04-20",
          "dueDate": "2025-04-30",
          "status": "Pending",
          "address": "Pécs, Piac tér 1.",
          "phoneNumber": "+36 70 567 8901",
          "email": "ugyfel5@example.com"
        },
        {
          "serviceId": "73ebdb89-e464-4612-a25e-3c25f58528e3",
          "description": "Homokfúvott díszüveg nappaliba.",
          "orderDate": "2025-04-25",
          "dueDate": "2025-05-05",
          "status": "Pending",
          "address": "Székesfehérvár, Dísz tér 5.",
          "phoneNumber": "+36 20 678 9012",
          "email": "ugyfel6@example.com"
        },
        {
          "serviceId": "e671e2e5-daf7-4104-ae0b-d36b6a2f44e2",
          "description": "Irodai üveg válaszfal kialakítása.",
          "orderDate": "2025-05-01",
          "dueDate": "2025-05-10",
          "status": "Pending",
          "address": "Eger, Iroda utca 9.",
          "phoneNumber": "+36 30 789 0123",
          "email": "ugyfel7@example.com"
        },
        {
          "serviceId": "37a47d23-6400-451f-bd13-f24df0c4402d",
          "description": "Nappali sarokba üvegpolcok.",
          "orderDate": "2025-05-05",
          "dueDate": "2025-05-15",
          "status": "Pending",
          "address": "Veszprém, Polc utca 4.",
          "phoneNumber": "+36 70 890 1234",
          "email": "ugyfel8@example.com"
        },
        {
          "serviceId": "2fc4e5b0-c275-46f8-9f30-8a2c930bca05",
          "description": "Biztonsági üveg telepítése raktárhoz.",
          "orderDate": "2025-05-10",
          "dueDate": "2025-05-20",
          "status": "Pending",
          "address": "Kecskemét, Raktár út 3.",
          "phoneNumber": "+36 20 901 2345",
          "email": "ugyfel9@example.com"
        },
        {
          "serviceId": "51ecab8a-b840-4b85-95a3-dc892247d0c1",
          "description": "Egyedi üvegasztal megrendelése étkezőbe.",
          "orderDate": "2025-05-15",
          "dueDate": "2025-05-25",
          "status": "Pending",
          "address": "Miskolc, Asztal utca 6.",
          "phoneNumber": "+36 30 012 3456",
          "email": "ugyfel10@example.com"
        }
      ]

    dummyOrders.forEach(element => {
      this.dummyCreate(element).subscribe({
        next: data => {
          console.log('Létrehozva:', data)
        },
        error: err => console.log(err)
      })
    });
  }
}

