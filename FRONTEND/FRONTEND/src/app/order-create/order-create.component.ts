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
  isSubmitting: boolean = false

  constructor(private router: Router, public ordService: OrderService, public servService: ServiceService) { }

  ngOnInit(): void {
    this.servService.loadAll().subscribe({
      next: data => console.log(data),
      error: err => console.log(err)
    })

    this.servService.services$.subscribe(services => {
      this.services = services
    })
  }

  onSubmit(): void {
    if (this.isSubmitting) return
    this.isSubmitting=true

    this.ordService.create(this.order).subscribe({
      next: data => {
        console.log('Létrehozva:', data)
        this.router.navigate(["orders"])
      },
      error: err => {
        console.error('Hiba a létrehozáskor:', err)
        this.isSubmitting=false
      }
    })
  }
}
