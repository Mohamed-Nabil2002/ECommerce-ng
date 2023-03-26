import { Product } from './../interfaces/product';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = "";
  searchResult: undefined | Product[];
  constructor(private router: Router, private productService: ProductService) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (localStorage.getItem("seller") && event.url.includes("seller")) {
          this.menuType = "seller";
          if (localStorage.getItem("seller")) {
            const sellerStore = localStorage.getItem("seller");
            const sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        } else {
          this.menuType = "default";
        }
      }
    })
  }

  logout() {
    localStorage.removeItem("seller");
    this.router.navigate(['/']);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProducts(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

}
