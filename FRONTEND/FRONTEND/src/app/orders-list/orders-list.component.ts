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

  constructor(private router: Router, private http: HttpClient, public ordService: OrderService) { }

  activeOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status !== this.orderstatus.Completed)
  }

  archivedOrders(): Order[] {
    return this.ordService.orders.filter(x => x.status === this.orderstatus.Completed)
  }
}
