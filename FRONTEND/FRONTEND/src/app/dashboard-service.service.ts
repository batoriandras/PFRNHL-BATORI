import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardStats } from './dashboard-stats';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private apiBaseUrl: string = "https://localhost:7183/api/Admin"

  constructor(private http: HttpClient) {}

  loadAll(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(this.apiBaseUrl)
  }
}
