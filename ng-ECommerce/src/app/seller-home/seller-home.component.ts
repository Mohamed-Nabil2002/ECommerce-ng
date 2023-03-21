import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: Product[]
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getAllProduct()
    .subscribe((list) => {
      this.productList = list
    })
  }

}
