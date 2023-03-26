import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: undefined | Product[];
  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    let query = this.activatedRoute.snapshot.paramMap.get("query");
    query && this.productService.searchProducts(query).subscribe((result) => {
      this.searchResult = result;
    })
  }

}
