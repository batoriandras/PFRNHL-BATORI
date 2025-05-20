import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order, OrderStatus } from '../order';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.sass'
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = []
  expandedOrderIndex: number | null = null
  expandedArchivedOrderIndex: number | null = null;
  orderstatus = OrderStatus
  order: Order = new Order

  constructor(private router: Router, private http: HttpClient, public ordService: OrderService) { }

  ngOnInit(): void {
    this.ordService.loadAll().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })

    this.ordService.orders$.subscribe(orders => {
      this.orders = orders
    })
  }

  get activeOrders(): Order[] {
    return this.orders.filter(x => x.status !== OrderStatus.Completed && x.status !== OrderStatus.Declined).sort((a, b) => {
      if (a.status === OrderStatus.InProgress && b.status !== OrderStatus.InProgress) return -1
      if (a.status !== OrderStatus.InProgress && b.status === OrderStatus.InProgress) return 1
      return 0
    })
  }

  get archivedOrders(): Order[] {
    return this.orders.filter(x => x.status === OrderStatus.Completed || x.status === OrderStatus.Declined)
      .sort((a, b) => {
        if (a.status === OrderStatus.Completed && b.status !== OrderStatus.Completed) return -1
        if (a.status !== OrderStatus.Completed && b.status === OrderStatus.Completed) return 1
        return 0
      })
  }

  isOverdue(dueDate: string | Date): boolean {
    return new Date(dueDate) < new Date()
  }

  completeOrder(order: Order): void {
    order.status = OrderStatus.Completed
    this.ordService.update(order).subscribe({
      next: data => {
        let index = this.orders.findIndex(x => x.id === order.id)
        this.orders[index] = order
        console.log('Frissítve:', data)
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err)
      }
    })
  }

  acceptOrder(order: Order): void {
    order.status = OrderStatus.InProgress
    this.ordService.update(order).subscribe({
      next: data => {
        let index = this.orders.findIndex(x => x.id === order.id)
        this.orders[index] = order
        console.log('Frissítve:', data)
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err)
      }
    })
  }

  declineOrder(order: Order): void {
    order.status = OrderStatus.Declined
    this.ordService.update(order).subscribe({
      next: data => {
        let index = this.orders.findIndex(x => x.id === order.id)
        this.orders[index] = order
        console.log('Frissítve:', data)
      },
      error: err => {
        console.error('Hiba történt frissítéskor:', err)
      }
    })
  }

  deleteOrder(order: Order): void {
    this.ordService.delete(order).subscribe({
      next: () => {
        this.orders = this.orders.filter(x => x.id !== order.id)
        console.log('Sikeresen törölve:', order)
      },
      error: err => {
        console.error('Hiba történt a törlés során:', err)
      }
    })
  }
}
