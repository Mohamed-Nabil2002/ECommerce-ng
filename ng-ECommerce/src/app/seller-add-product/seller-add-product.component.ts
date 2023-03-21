import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string | undefined;
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  submit(data: Product) {
    this.productService.addProduct(data)
      .subscribe((res) => {
        if (res) {
          this.addProductMessage = "Product is successfully added"
        }
        setTimeout(() => {
          this.addProductMessage = undefined;
        }, 3000);
      })
  }

}
