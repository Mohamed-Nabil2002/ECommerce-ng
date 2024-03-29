import { Order } from './../interfaces/order';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getAllOrders();
  }

  private getAllOrders(): void {
    this.productService.getOrdersList().subscribe((result: any) => {
      this.orderData = result;
    });
  }

  cancelOrder(orderId: number | undefined): void {
    orderId &&
      this.productService.deleteOrder(orderId).subscribe((result: any) => {
        if (result) this.getAllOrders();
      });
  }

}
