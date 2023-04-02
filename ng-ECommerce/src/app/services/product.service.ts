import { Order } from './../interfaces/order';
import { Observable } from 'rxjs';
import { Cart } from './../interfaces/cart';
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
    // this.cartData.emit(cartData);
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

  addToCart(cartData: Cart): Observable<any> {
    return this.http.post(`${this.baseURL}/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`${this.baseURL}/cart?userId=${userId}`, {
        observe: 'response',
      })
      .subscribe((result: any) => {
        if (result && result.body) this.cartData.emit(result.body);
      });
  }

  removeToCart(cartId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/cart/${cartId}`);
  }

  getCurrentCart(): Observable<any> {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(
      `${this.baseURL}/cart?userId=${userData.id}`
    );
  }

  orderNow(orderData: Order): Observable<any> {
    return this.http.post(`${this.baseURL}/orders`, orderData);
  }

  getOrdersList(): Observable<any> {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(
      `${this.baseURL}/orders?userId=${userData[0].id}`
    );
  }

  deleteCartItems(cartId: number): any {
    return this.http
      .delete(`${this.baseURL}/cart/${cartId}`, { observe: 'response' })
      .subscribe((result: any) => {
        if (result) this.cartData.emit([]);
      });
  }

  deleteOrder(orderId: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/orders/${orderId}`);
  }
}
