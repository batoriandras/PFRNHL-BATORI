import { Injectable } from '@angular/core';
import { Order } from './order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orders: Order[] = []
  adminorder: Order = new Order
  guestorder: Order = new Order
  localdbname: string = "local_orders"
  apiBaseUrl: string = "https://localhost:7183/api/Order"
  constructor(private http: HttpClient) {
    this.loadOrders()
  }

  loadOrders(): void {
    this.http.get<Order[]>(this.apiBaseUrl).subscribe(data => {
      this.orders = data
    })
  }

  loadAdminview(order: Order): void {
    this.http.get<Order>(this.apiBaseUrl + "/adminview/" + order.id).subscribe(data => {
      this.adminorder = data
    })
  }

  loadGuestView(order: Order): void {
    this.http.get<Order>(this.apiBaseUrl + "/guestview/" + order.id).subscribe(data => {
      this.guestorder = data
    })
  }

  create(order: Order): void {
    this.http.post(this.apiBaseUrl, order).subscribe({
      next: (response) => {
        console.log(response)
        this.orders.push(order)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  update(order: Order): void {
    this.http.put(this.apiBaseUrl + '/' + order.id, order).subscribe({
      next: (response) => {
        console.log(response)
        let index = this.orders.findIndex(x => x.id === order.id)
        this.orders[index] = order
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  deleteService(order: Order): void {
    this.http.delete(this.apiBaseUrl + '/' + order.id).subscribe({
      next: (response) => {
        console.log(response)
        this.orders = this.orders.filter(x => x.id !== order.id)
      },
      error: err => {
        console.error(err)
      }
    });
  }
}
