import { OrderStatus } from "./order";

export interface OrderCreateDto {
  serviceId: string;
  description: string;
  orderDate: string;   
  dueDate: string;      
  status: string;
  address: string;
  phoneNumber: string;
  email: string;
}
