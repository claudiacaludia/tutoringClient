import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, retry, throwError} from 'rxjs';
import {api_url} from './api-urls';
import {Appointment} from './appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStoreService {
  private api = `${api_url}`;

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Array<Appointment>> {
    return this.http.get<Array<Appointment>>(`${this.api}/appointments`).
      pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Appointment> {
    return this.http.get<Appointment[]>(`${this.api}/appointments/${id}`).pipe(
      retry(3),
      catchError(this.errorHandler),
      map(arr => arr[0])  // Nimm das erste Element vom Array
    );
  }



  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }

  remove(id: number): Observable<Appointment> {
    return this.http.delete<any>(`${this.api}/appointment/${id}`).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(appointment: Appointment): Observable<any> {
    return this.http.put<Appointment>(`${this.api}/appointment/${appointment.id}`, appointment).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(appointment: Appointment): Observable<any> {
    return this.http.post<Appointment>(`${this.api}/appointment`, appointment).
    pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

}
