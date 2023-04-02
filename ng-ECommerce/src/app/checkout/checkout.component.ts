import { Order } from './../interfaces/order';
import { Cart } from './../interfaces/cart';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice: undefined | number;
  cartData: undefined | Cart[];
  orderMsg: string | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getCurrentCart();
  }

  private getCurrentCart(): void {
    this.productService.getCurrentCart().subscribe((result: any) => {
      let price: number = 0;
      this.cartData = result;
      result.forEach((item: Cart) => {
        if (item.quantity) price += +item.price * +item.quantity;
      });
      this.totalPrice = price + (price / 10 + 100) - price / 10;
    });
  }

  orderNow(data: { email: string; address: string; contact: string }): void {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined,
      };


      this.productService.orderNow(orderData).subscribe((result: any) => {
        if (result) {
          console.log(result);
        }
      });
    }
  }

}
