import { Service } from "./service"

export enum OrderStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export class Order {
  id: string = ''
  serviceId: string = ''
  service?: Service[] = []
  description: string = ''
  orderDate: Date = new Date()
  dueDate: Date = new Date()
  completionDate?: Date
  status: OrderStatus = OrderStatus.Pending
  address: string = ''
  phoneNumber: string = ''
  email: string = ''

  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }
}
