
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IEmployee} from "../../shared/model/employee";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = '/api/v1/schedule';

  public constructor(private http: HttpClient) {}

  public getSchedules(): Observable<IEmployee[]> {
    return this.http.get<IEmployee[]>(this.apiUrl);
  }

  public addSchedule(schedule: Partial<IEmployee>): Observable<IEmployee> {
    return this.http.post<IEmployee>(this.apiUrl, schedule);
  }

  public updateSchedule(id: number, schedule: Partial<IEmployee>): Observable<IEmployee> {
    return this.http.put<IEmployee>(`${this.apiUrl}/${id}`, schedule);
  }

  public deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
