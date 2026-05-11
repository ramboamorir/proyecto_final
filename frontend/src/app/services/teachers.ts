import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class teachersServices {

  // private api = 'http://localhost:3000/docentes';
  private api = 'http://3.15.171.46:3000/docentes';

  constructor(private http: HttpClient) {}

  // private getHeaders() {
  //   const token = localStorage.getItem('token');

  //   return {
  //     headers: new HttpHeaders({
  //       Authorization: `Bearer ${token}`
  //     })
  //   };
  // }

  getAll() {
    return this.http.get<any>(this.api);
  }

  create(data: any) {
    return this.http.post(this.api, data);
  }

  update(id: Number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: Number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
