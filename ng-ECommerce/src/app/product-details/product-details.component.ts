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
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

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
  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === "min"){
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem("user")) {
        this.productService.localAddToCart(this.productData);
        this.removecart = true;
      }
    }
  }

  removeToCart(id: number) {
    this.productService.removeFromCart(id);
    this.removecart = false;
  }

}
