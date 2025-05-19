import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Order, OrderStatus } from '../order';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { Service } from '../service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-create',
  standalone: false,
  templateUrl: './order-create.component.html',
  styleUrl: './order-create.component.sass'
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order()
  services: Service[] = []
  orderstatus = OrderStatus
  today: string = new Date().toISOString().substring(0, 10)

  constructor(private router: Router, public ordService: OrderService, public servService: ServiceService) { }

  ngOnInit(): void {
    this.servService.loadAll().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })

    this.servService.services$.subscribe(services=>{
      this.services=services
    })
  }

  onSubmit(): void {
    this.ordService.create(this.order).subscribe({
      next: data => {
        console.log('Létrehozva:', data);
      },
      error: err => {
        console.error('Hiba a létrehozáskor:', err);
      }
    });
    this.router.navigate(["orders"])
  }
}
