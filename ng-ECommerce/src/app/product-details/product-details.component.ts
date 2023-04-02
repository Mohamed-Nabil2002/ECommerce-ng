import { Cart } from './../interfaces/cart';
import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | Product;
  productQuantity: number = 1;
  removecart: boolean = false;
  cartData: Product | undefined;
  constructor(private activatedRoute: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get("productId");
    this.productService.getProduct(productId).subscribe((res) => {
      this.productData = res;
    });

    let cartData = localStorage.getItem("localCart");
    if (productId && cartData) {
      let items = JSON.parse(cartData);
      items = items.filter((item: Product) => productId = item.id.toString());
      if (items.length) {
        this.removecart = true;
      } else {
        this.removecart = false;
      }
    }
    let user = localStorage.getItem("user");
    if (user) {
      let userId = user && JSON.parse(user).id;
      this.productService.getCartList(userId);
      this.productService.cartData.subscribe((result) => {
        let item = result.filter((item: Product) => {
          productId.toString() === item.productId.toString();
        });
        if (item.length) {
          this.cartData = item[0];
          this.removecart = true;
        }
      })
    }
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === "min") {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem("user")) {
        this.productService.localAddToCart(this.productData);
        this.removecart = true;
      } else {
        let user = localStorage.getItem("user");
        let userId = user && JSON.parse(user).id;
        console.log(userId);
        let cartData: Cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        this.productService.addToCart(cartData).subscribe(result => {
          if (result) {
            this.productService.getCartList(userId);
            this.removecart = true;
          }
        })
      }
    }
  }

  removeToCart(id: number) {
    if (!localStorage.getItem("user")) {
      this.productService.removeFromCart(id);
    } else {
      let user = localStorage.getItem("user");
      let userId = user && JSON.parse(user).id;
      this.cartData && this.productService.removeToCart(this.cartData.id)
        .subscribe((result) => {
          if (result) {
            this.productService.getCartList(userId);
          }
        })
      this.removecart = false;
    }
  }
}
