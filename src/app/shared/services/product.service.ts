import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  private authSecretKey = 'Bearer Token';

  constructor(private http: HttpClient) {
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpheWRlZXAgUGF0aWwiLCJpYXQiOjE1MTYyMzkwMjJ9.yt3EOXf60R62Mef2oFpbFh2ihkP5qZ4fM8bjVnF8YhA'; // Generate or receive the token from your server
    localStorage.setItem(this.authSecretKey, authToken);
  }

  getProducts(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/products`, { headers });
  }

  getProductDetailById(id: number) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/products/` + id, { headers });
  }

  private getHeaders() {
    const authToken = localStorage.getItem(this.authSecretKey);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    });

    return headers;
  }

  isAuthurized() {
    const authToken = localStorage.getItem(this.authSecretKey);
    return authToken ? true : false;
  }
}
