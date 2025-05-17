import { Order } from "./order"

export class Service {
    id: string = ""
    name: string= ""
    description: string = ""
    orders?: Order[] =[]
    employees?: Employee[] = []

      constructor(init?: Partial<Service>) {
    Object.assign(this, init);
  }
}
