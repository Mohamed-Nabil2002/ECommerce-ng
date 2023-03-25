import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  productMessage: undefined | string;
  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get("id");
    this.productService.getProduct(productId).subscribe((product) => {
      this.productData = product;
    })
  }

  submit(product: Product) {
    if (this.productData) {
      product.id = this.productData.id;
    }
    this.productService.updateProduct(product).subscribe((product) => {
      if (product) {
        this.productMessage = "Product Has Updated";
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 2000);
  }

}
