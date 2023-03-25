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
  constructor(private route: ActivatedRoute,
    private productService: ProductService) { }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get("id");
    console.log(productId);
    this.productService.getProduct(productId).subscribe((product) => {
      console.log(product);
      this.productData = product;
    })
  }

}
