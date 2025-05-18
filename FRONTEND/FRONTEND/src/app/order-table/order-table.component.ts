import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Order, OrderStatus } from '../order';

@Component({
  selector: 'app-order-table',
  standalone: false,
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.sass'
})
export class OrderTableComponent {
  @Input() orders: Order[] = []
  expandedIndex: number | null = null
  @Input() orderstatus = OrderStatus
  @Output() orderUpdated = new EventEmitter<Order>();

  completeOrder(order: Order):void{
    order.status= this.orderstatus.Completed
    this.orderUpdated.emit(order)
  }

  acceptOrder(order: Order): void{
    order.status= this.orderstatus.InProgress
    this.orderUpdated.emit(order)
  }

  declineOrder(order: Order): void{}
}
