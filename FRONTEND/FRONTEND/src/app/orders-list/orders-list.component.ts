import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../order.service';
import { Order, OrderStatus } from '../order';

@Component({
  selector: 'app-orders-list',
  standalone: false,
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.sass'
})
export class OrdersListComponent {
  public expandedOrderIndex: number | null = null
  public expandedArchivedOrderIndex: number | null = null;
  orderstatus = OrderStatus
  order: Order = new Order

  constructor(private router: Router, private http: HttpClient, public ordService: OrderService) { }

  get activeOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status !== OrderStatus.Completed && x.status !== OrderStatus.Declined)
  }

  get archivedOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status === OrderStatus.Completed || x.status === OrderStatus.Declined)
  }

  completeOrder(order: Order): void {
    order.status = OrderStatus.Completed
    this.ordService.update(order)
  }

  acceptOrder(order: Order): void {
    order.status = OrderStatus.InProgress
    this.ordService.update(order)
  }

  declineOrder(order: Order): void {
    order.status = OrderStatus.Declined
    this.ordService.update(order)
  }

  remove(order: Order): void{
    this.ordService.deleteOrder(order)
  }
}
