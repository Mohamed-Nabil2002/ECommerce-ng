import { Product } from './../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseURL = 'http://localhost:3000';
  cartData = new EventEmitter<Product[] | []>();
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

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }

  removeFromCart(productId: number): void {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData).filter(
        (item: Product) => productId !== item.id
      );
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
}
