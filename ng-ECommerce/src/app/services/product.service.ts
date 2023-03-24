import { Observable } from 'rxjs';
import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addProduct(data: Product) {
    return this.http.post(`${this.baseURL}/products`, data);
  }

  getAllProduct() {
    return this.http.get<Product[]>(`${this.baseURL}/products`)
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/products/${id}`)
  }
}
