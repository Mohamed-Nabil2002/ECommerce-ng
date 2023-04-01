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
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get("productId");
    this.productService.getProduct(productId).subscribe((res) => {
      this.productData = res;
    })
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
        this.productService.localAddToCart(this.productData)
      }
    }
  }

}
