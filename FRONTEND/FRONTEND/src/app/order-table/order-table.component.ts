import { Component, Input, input } from '@angular/core';
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
}
