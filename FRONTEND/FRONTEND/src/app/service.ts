import { Employee } from "./employee"
import { Order } from "./order"

export class Service {
    id: string = ""
    name: string= ""
    description: string = ""
    orders?: Order[]
    employees?: Employee[]
    editMode: boolean = false

      constructor(init?: Partial<Service>) {
    Object.assign(this, init)
  }
}
