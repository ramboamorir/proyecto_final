import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class studentsServices {

  private api = 'http://localhost:3000/estudiantes'; // ajusta si tu backend usa /students o /estudiantes

  constructor(private http: HttpClient) {}

  // =========================
  // 📌 GET ALL
  // =========================
  getAll(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  // =========================
  // 📌 CREATE
  // =========================
  create(emp: any) {
    return this.http.post(this.api, emp);
  }

  // =========================
  // 📌 UPDATE
  // =========================
  update(id: Number, data: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, data);
  }

  // =========================
  // 📌 DELETE
  // =========================
  delete(id: Number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}
