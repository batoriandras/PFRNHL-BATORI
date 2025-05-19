import { Injectable } from '@angular/core';
import { Order, OrderStatus } from './order';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiBaseUrl: string = "https://localhost:7183/api/Order";

  constructor(private http: HttpClient) { }

  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiBaseUrl);
  }

  loadAdminview(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiBaseUrl}/adminview/${orderId}`);
  }

  loadGuestView(orderId: string): Observable<Order> {
    return this.http.get<Order>(`${this.apiBaseUrl}/guestview/${orderId}`);
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiBaseUrl, order);
  }

  update(order: Order): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${order.id}`, { status: order.status });
  }

  delete(order: Order): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/${order.id}`);
  }

  seed(): void {
    const asd: Order[] = [
      {
        "id": "1a3b5c7d-1234-4ef5-91ab-a1a2b3c4d5e6",
        "serviceId": "643839e7-9e7f-47a8-b3d6-756884470907",
        "description": "Konyhai ablak üvegének cseréje.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Budapest, Fő utca 12.",
        "phoneNumber": "+36 30 123 4567",
        "email": "ugyfel1@example.com"
      },
      {
        "id": "2b4c6d8e-2345-4af6-82bc-b2c3d4e5f6a7",
        "serviceId": "c63f7db7-536e-49a6-9855-bb03957c8300",
        "description": "Fürdőszobai tükör egyedi méretben.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Szeged, Tavasz utca 8.",
        "phoneNumber": "+36 70 234 5678",
        "email": "ugyfel2@example.com"
      },
      {
        "id": "3c5d7e9f-3456-4bf7-73cd-c3d4e5f6a7b8",
        "serviceId": "38b11a72-87b9-465c-8e0b-a866c1dd9107",
        "description": "Zuhanykabin üveg megrendelése új építéshez.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Debrecen, Nyár utca 15.",
        "phoneNumber": "+36 20 345 6789",
        "email": "ugyfel3@example.com"
      },
      {
        "id": "4d6e8f10-4567-4cf8-64de-d4e5f6a7b8c9",
        "serviceId": "a0864b2a-b284-4bbb-bd2e-0d5946394f38",
        "description": "Terem üvegkorlát kivitelezése.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Győr, Víz utca 20.",
        "phoneNumber": "+36 30 456 7890",
        "email": "ugyfel4@example.com"
      },
      {
        "id": "5e7f9011-5678-4df9-55ef-e5f6a7b8c9d0",
        "serviceId": "92e07714-32ec-4a02-9eed-51f1e09c94cf",
        "description": "Üzlet kirakatüveg cseréje.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Pécs, Piac tér 1.",
        "phoneNumber": "+36 70 567 8901",
        "email": "ugyfel5@example.com"
      },
      {
        "id": "6f801122-6789-4ef0-46f0-f6a7b8c9d0e1",
        "serviceId": "3a11eebd-568e-4700-bbe9-93fb9ce813e2",
        "description": "Homokfúvott díszüveg nappaliba.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Székesfehérvár, Dísz tér 5.",
        "phoneNumber": "+36 20 678 9012",
        "email": "ugyfel6@example.com"
      },
      {
        "id": "70813233-7890-4ff1-37g1-a7b8c9d0e1f2",
        "serviceId": "f72f9805-5961-493c-b89b-cf4474d01a83",
        "description": "Irodai üveg válaszfal kialakítása.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Eger, Iroda utca 9.",
        "phoneNumber": "+36 30 789 0123",
        "email": "ugyfel7@example.com"
      },
      {
        "id": "81924344-8901-4a02-28h2-b8c9d0e1f203",
        "serviceId": "1516c21e-2aba-4cc7-bba6-0470bfa05020",
        "description": "Nappali sarokba üvegpolcok.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Veszprém, Polc utca 4.",
        "phoneNumber": "+36 70 890 1234",
        "email": "ugyfel8@example.com"
      },
      {
        "id": "92a35455-9012-4b13-19i3-c9d0e1f20314",
        "serviceId": "e5b7c40a-c5f1-4ad4-bc85-948ae8125376",
        "description": "Biztonsági üveg telepítése raktárhoz.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Kecskemét, Raktár út 3.",
        "phoneNumber": "+36 20 901 2345",
        "email": "ugyfel9@example.com"
      },
      {
        "id": "a3b46566-0123-4c24-0aj4-d0e1f2031425",
        "serviceId": "54bf8a82-a12b-41a3-b8d3-4851d3397cd3",
        "description": "Egyedi üvegasztal megrendelése étkezőbe.",
        "orderDate": new Date("2025-05-10"),
        "dueDate": new Date("2025-05-20"),
        "completionDate": undefined,
        "status": OrderStatus.Pending,
        "address": "Miskolc, Asztal utca 6.",
        "phoneNumber": "+36 30 012 3456",
        "email": "ugyfel10@example.com"
      }
    ]

    asd.forEach(element => {
      this.create(element)
    });
  }
}

