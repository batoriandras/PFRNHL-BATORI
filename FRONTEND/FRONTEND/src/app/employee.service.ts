import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[] = []
  localdbname: string = "local_employees"
  apiBaseUrl: string = "https://localhost:7183/api/Employee"
  constructor(private http: HttpClient) {
    this.loadEmployees()
    //this.seed()
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(this.apiBaseUrl).subscribe(data => {
      this.employees = data
    })
  }

  create(employee: Employee): void {
    this.http.post(this.apiBaseUrl, employee).subscribe({
      next: (response) => {
        console.log(response)
        this.employees.push(employee)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  update(employee: Employee): void {
    this.http.put(this.apiBaseUrl + '/' + employee.id, employee).subscribe({
      next: (response) => {
        console.log(response)
        let index = this.employees.findIndex(x => x.id === employee.id)
        this.employees[index] = employee
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  delete(employee: Employee): void {
    this.http.delete(this.apiBaseUrl + '/' + employee.id).subscribe({
      next: (response) => {
        console.log(response)
        this.employees = this.employees.filter(x => x.id !== employee.id)
      },
      error: err => {
        console.error(err)
      }
    });
  }

  seed(): void {
    const asd: Employee[] = [
      {
        id: "e1",
        firstname: "János",
        lastname: "Nagy",
        username: "jnagy",
        email: "jnagy@example.com",
        phoneNumber: "+36 30 123 4567",
        address: "Budapest, Fő utca 1",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        dateOfEmployment: new Date("2020-01-15T00:00:00.000Z"),
        serviceIDs: [
          "643839e7-9e7f-47a8-b3d6-756884470907",
          "1516c21e-2aba-4cc7-bba6-0470bfa05020"
        ]
      },
      {
        id: "e2",
        firstname: "Anna",
        lastname: "Kiss",
        username: "akiss",
        email: "akiss@example.com",
        phoneNumber: "+36 70 234 5678",
        address: "Szeged, Tavasz utca 2",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        dateOfEmployment: new Date("2021-03-10T00:00:00.000Z"),
        serviceIDs: [
          "38b11a72-87b9-465c-8e0b-a866c1dd9107"
        ]
      },
      {
        id: "e3",
        firstname: "László",
        lastname: "Tóth",
        username: "ltoth",
        email: "ltoth@example.com",
        phoneNumber: "+36 20 345 6789",
        address: "Debrecen, Nyár utca 3",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        dateOfEmployment: new Date("2019-07-23T00:00:00.000Z"),
        serviceIDs: [
          "3a11eebd-568e-4700-bbe9-93fb9ce813e2",
          "54bf8a82-a12b-41a3-b8d3-4851d3397cd3",
          "1516c21e-2aba-4cc7-bba6-0470bfa05020"
        ]
      },
      {
        id: "e4",
        firstname: "Eszter",
        lastname: "Molnár",
        username: "emolnar",
        email: "emolnar@example.com",
        phoneNumber: "+36 30 456 7890",
        address: "Győr, Víz utca 4",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        dateOfEmployment: new Date("2022-11-05T00:00:00.000Z"),
        serviceIDs: [
          "a0864b2a-b284-4bbb-bd2e-0d5946394f38"
        ]
      },
      {
        id: "e5",
        firstname: "Zoltán",
        lastname: "Farkas",
        username: "zfarkas",
        email: "zfarkas@example.com",
        phoneNumber: "+36 70 567 8901",
        address: "Pécs, Piac tér 5",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        dateOfEmployment: new Date("2018-09-30T00:00:00.000Z"),
        serviceIDs: [
          "c63f7db7-536e-49a6-9855-bb03957c8300",
          "e5b7c40a-c5f1-4ad4-bc85-948ae8125376",
          "f72f9805-5961-493c-b89b-cf4474d01a83"
        ]
      },
      {
        id: "e6",
        firstname: "Mária",
        lastname: "Varga",
        username: "mvarga",
        email: "mvarga@example.com",
        phoneNumber: "+36 20 678 9012",
        address: "Székesfehérvár, Dísz tér 5",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        dateOfEmployment: new Date("2023-02-12T00:00:00.000Z"),
        serviceIDs: [
          "92e07714-32ec-4a02-9eed-51f1e09c94cf"
        ]
      },
      {
        id: "e7",
        firstname: "Gábor",
        lastname: "Kovács",
        username: "gkovacs",
        email: "gkovacs@example.com",
        phoneNumber: "+36 30 789 0123",
        address: "Eger, Iroda utca 9",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        dateOfEmployment: new Date("2017-08-20T00:00:00.000Z"),
        serviceIDs: [
          "f72f9805-5961-493c-b89b-cf4474d01a83",
          "1516c21e-2aba-4cc7-bba6-0470bfa05020"
        ]
      },
      {
        id: "e8",
        firstname: "Ildikó",
        lastname: "Horváth",
        username: "ihorvath",
        email: "ihorvath@example.com",
        phoneNumber: "+36 70 890 1234",
        address: "Veszprém, Polc utca 4",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        dateOfEmployment: new Date("2021-05-01T00:00:00.000Z"),
        serviceIDs: [
          "1516c21e-2aba-4cc7-bba6-0470bfa05020"
        ]
      },
      {
        id: "e9",
        firstname: "Tamás",
        lastname: "Balogh",
        username: "tbalogh",
        email: "tbalogh@example.com",
        phoneNumber: "+36 20 901 2345",
        address: "Kecskemét, Raktár út 3",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        dateOfEmployment: new Date("2019-12-15T00:00:00.000Z"),
        serviceIDs: [
          "e5b7c40a-c5f1-4ad4-bc85-948ae8125376"
        ]
      },
      {
        id: "e10",
        firstname: "Réka",
        lastname: "Fischer",
        username: "rfischer",
        email: "rfischer@example.com",
        phoneNumber: "+36 30 012 3456",
        address: "Miskolc, Asztal utca 6",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
        dateOfEmployment: new Date("2022-06-25T00:00:00.000Z"),
        serviceIDs: [
          "54bf8a82-a12b-41a3-b8d3-4851d3397cd3"
        ]
      }
    ];

    asd.forEach(element => {
      this.create(element)
    });
  }
}
