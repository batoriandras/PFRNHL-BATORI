import { Service } from "./service";

export class Employee {

    id: string = ''
    firstname: string = ''
    lastname: string = ''
    username: string = ''
    email: string = ''
    phoneNumber: string = ''
    address: string = ''
    image: string = ''
    dateOfEmployment: Date = new Date()
    serviceIDs: string[] = []
    services?: Service[]

    constructor(init?: Partial<Employee>) {
        Object.assign(this, init);
    }
}
