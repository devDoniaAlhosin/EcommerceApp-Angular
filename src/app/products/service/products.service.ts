import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products`);
  }
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/categories`);
  }

  getProductsByCategory(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/category/${keyword}`);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`);
  }
}
