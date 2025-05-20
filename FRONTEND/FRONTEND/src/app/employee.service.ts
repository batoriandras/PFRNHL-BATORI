import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, elementAt, Observable, tap } from 'rxjs';
import { EmployeeCreateDto } from './employee-create-dto';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiBaseUrl: string = "https://localhost:7183/api/Employee"

  private employeesSubject = new BehaviorSubject<Employee[]>([])
  public employees$ = this.employeesSubject.asObservable()

  constructor(private http: HttpClient) {
    //this.seed()
    this.loadAll().subscribe()
  }

  loadAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiBaseUrl).pipe(
      tap(employees => this.employeesSubject.next(employees))
    )
  }

  dummyCreate(employee: EmployeeCreateDto): Observable<Employee> {
    return this.http.post<Employee>(this.apiBaseUrl, employee).pipe(
      tap(created => {
        const current = this.employeesSubject.value
        this.employeesSubject.next([...current, created])
      })
    )
  }

  create(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiBaseUrl, employee).pipe(
      tap(created => {
        const current = this.employeesSubject.value
        this.employeesSubject.next([...current, created])
      })
    )
  }

  update(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiBaseUrl}/${employee.id}`, employee).pipe(
      tap(updated => {
        const current = this.employeesSubject.value
        const index = current.findIndex(e => e.id === updated.id)
        if (index !== -1) {
          current[index] = updated
          this.employeesSubject.next([...current])
        }
      })
    )
  }

  delete(employee: Employee): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}/${employee.id}`).pipe(
      tap(() => {
        const current = this.employeesSubject.value.filter(e => e.id !== employee.id)
        this.employeesSubject.next(current)
      })
    )
  }

  seed(): void {
    const dummyEmployees: EmployeeCreateDto[] = [

      {
        firstname: "János",
        lastname: "Nagy",
        username: "jnagy",
        email: "jnagy@example.com",
        phoneNumber: "+36 30 123 4567",
        address: "Budapest, Fő utca 1",
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        dateOfEmployment: new Date("2020-01-15T00:00:00.000Z"),
        serviceIDs: [
          "f485a345-2446-4c09-b791-5299675f92b5",
          "37a47d23-6400-451f-bd13-f24df0c4402d"
        ]
      },
      {
        firstname: "Anna",
        lastname: "Kiss",
        username: "akiss",
        email: "akiss@example.com",
        phoneNumber: "+36 70 234 5678",
        address: "Szeged, Tavasz utca 2",
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        dateOfEmployment: new Date("2021-03-10T00:00:00.000Z"),
        serviceIDs: [
          "aaf721ff-7fb2-4187-a64a-f767b68132bb"
        ]
      },
      {
        firstname: "László",
        lastname: "Tóth",
        username: "ltoth",
        email: "ltoth@example.com",
        phoneNumber: "+36 20 345 6789",
        address: "Debrecen, Nyár utca 3",
        image: "https://randomuser.me/api/portraits/men/3.jpg",
        dateOfEmployment: new Date("2019-07-23T00:00:00.000Z"),
        serviceIDs: [
          "73ebdb89-e464-4612-a25e-3c25f58528e3",
          "51ecab8a-b840-4b85-95a3-dc892247d0c1",
          "37a47d23-6400-451f-bd13-f24df0c4402d"
        ]
      },
      {
        firstname: "Eszter",
        lastname: "Molnár",
        username: "emolnar",
        email: "emolnar@example.com",
        phoneNumber: "+36 30 456 7890",
        address: "Győr, Víz utca 4",
        image: "https://randomuser.me/api/portraits/women/4.jpg",
        dateOfEmployment: new Date("2022-11-05T00:00:00.000Z"),
        serviceIDs: [
          "577d4ca7-dd6d-47f5-8393-bb9696304a5b"
        ]
      },
      {
        firstname: "Zoltán",
        lastname: "Farkas",
        username: "zfarkas",
        email: "zfarkas@example.com",
        phoneNumber: "+36 70 567 8901",
        address: "Pécs, Piac tér 5",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
        dateOfEmployment: new Date("2018-09-30T00:00:00.000Z"),
        serviceIDs: [
          "21a886b3-e3bb-4afe-a48e-97947d2e9de9",
          "2fc4e5b0-c275-46f8-9f30-8a2c930bca05",
          "f485a345-2446-4c09-b791-5299675f92b5"
        ]
      },
      {
        firstname: "Mária",
        lastname: "Varga",
        username: "mvarga",
        email: "mvarga@example.com",
        phoneNumber: "+36 20 678 9012",
        address: "Székesfehérvár, Dísz tér 5",
        image: "https://randomuser.me/api/portraits/women/6.jpg",
        dateOfEmployment: new Date("2023-02-12T00:00:00.000Z"),
        serviceIDs: [
          "1a4e038a-fd56-44f2-b34a-9109779bc941"
        ]
      },
      {
        firstname: "Gábor",
        lastname: "Kovács",
        username: "gkovacs",
        email: "gkovacs@example.com",
        phoneNumber: "+36 30 789 0123",
        address: "Eger, Iroda utca 9",
        image: "https://randomuser.me/api/portraits/men/7.jpg",
        dateOfEmployment: new Date("2017-08-20T00:00:00.000Z"),
        serviceIDs: [
          "f485a345-2446-4c09-b791-5299675f92b5",
          "37a47d23-6400-451f-bd13-f24df0c4402d"
        ]
      },
      {
        firstname: "Ildikó",
        lastname: "Horváth",
        username: "ihorvath",
        email: "ihorvath@example.com",
        phoneNumber: "+36 70 890 1234",
        address: "Veszprém, Polc utca 4",
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        dateOfEmployment: new Date("2021-05-01T00:00:00.000Z"),
        serviceIDs: [
          "37a47d23-6400-451f-bd13-f24df0c4402d"
        ]
      },
      {
        firstname: "Tamás",
        lastname: "Balogh",
        username: "tbalogh",
        email: "tbalogh@example.com",
        phoneNumber: "+36 20 901 2345",
        address: "Kecskemét, Raktár út 3",
        image: "https://randomuser.me/api/portraits/men/9.jpg",
        dateOfEmployment: new Date("2019-12-15T00:00:00.000Z"),
        serviceIDs: [
          "2fc4e5b0-c275-46f8-9f30-8a2c930bca05"
        ]
      },
      {
        firstname: "Réka",
        lastname: "Fischer",
        username: "rfischer",
        email: "rfischer@example.com",
        phoneNumber: "+36 30 012 3456",
        address: "Miskolc, Asztal utca 6",
        image: "https://randomuser.me/api/portraits/women/10.jpg",
        dateOfEmployment: new Date("2022-06-25T00:00:00.000Z"),
        serviceIDs: [
          "51ecab8a-b840-4b85-95a3-dc892247d0c1"
        ]
      }
    ]

    dummyEmployees.forEach(element => {
      this.dummyCreate(element).subscribe()
    })
  }
}
