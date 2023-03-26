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
    return this.http.get<Product[]>(`${this.baseURL}/products`);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.baseURL}/products/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.baseURL}/products/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.baseURL}/products/${product.id}`, product);
  }

  popularProducts() {
    return this.http.get<Product[]>(`${this.baseURL}/products?_limit=3`);
  }

  trendyProducts() {
    return this.http.get<Product[]>(`${this.baseURL}/products?_limit=8`);
  }

  searchProducts(query: string) {
    return this.http.get<Product[]>(`${this.baseURL}/products?q=${query}`);
  }
}
