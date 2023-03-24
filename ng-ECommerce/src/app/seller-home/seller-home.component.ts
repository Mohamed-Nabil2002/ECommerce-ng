import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  productList: Product[];
  productMessage: undefined | string;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productsList();
  }

  deleteProduct(id: number) {
    console.log(id, "id");
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = "Product Is Deleted";
        this.productsList();
      }
    })
    setTimeout(() => {
      this.productMessage = undefined;
    }, 2000);
  }

  productsList() {
    this.productService.getAllProduct()
      .subscribe((list) => {
        console.log(list);
        if (list) {
          this.productList = list
        }
      })
  }

}
