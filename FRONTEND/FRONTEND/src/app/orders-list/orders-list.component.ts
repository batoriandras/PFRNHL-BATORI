import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
  public orderstatus = OrderStatus
  order: Order = new Order

  constructor(private router: Router, private http: HttpClient, public ordService: OrderService) { }

  activeOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status !== this.orderstatus.Completed && x.status !== this.orderstatus.Declined)
  }

  archivedOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status === this.orderstatus.Completed || x.status === this.orderstatus.Declined)
  }

  completeOrder(order: Order): void {
    order.status = this.orderstatus.Completed
    this.ordService.update(order)
  }

  acceptOrder(order: Order): void {
    order.status = this.orderstatus.InProgress
    this.ordService.update(order)
  }

  declineOrder(order: Order): void {
    order.status = this.orderstatus.Declined
    this.ordService.update(order)
  }

  remove(order: Order): void{
    this.ordService.deleteOrder(order)
  }
}
