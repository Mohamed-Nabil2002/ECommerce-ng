import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.popularProducts().subscribe((result) => {
      this.popularProducts = result;
    })
    this.productService.trendyProducts().subscribe((result) => {
      this.trendyProducts = result;
    })
  }

}
