import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order, OrderStatus } from '../order';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-create',
  standalone: false,
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.sass'
})
export class OrderCreateComponent {
  order: Order = new Order()
  orderstatus = OrderStatus
  today: string = new Date().toISOString().substring(0, 10)


  constructor(private router: Router, public ordService: OrderService, public serService: ServiceService) { }

  onSubmit(): void {
    this.ordService.create(this.order)
    this.router.navigate(["orders"])
  }
}
