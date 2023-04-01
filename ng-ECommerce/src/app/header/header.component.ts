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
  userName: string = "";
  cartItems = 0;
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
        } else if (localStorage.getItem("user")) {
          let userStore = localStorage.getItem("user");
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = "user";
        } else {
          this.menuType = "default";
        }
      }
    });
    let cartData = localStorage.getItem("localCart");
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    };
    this.productService.cartData.subscribe(items => {
      this.cartItems = items.length;
    })
  }

  logout() {
    localStorage.removeItem("seller");
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem("user");
    this.router.navigate(['/user-auth']);
    this.productService.cartData.emit([]);
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

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id])
  }

  submitSearch(val: string) {
    this.router.navigate([`search/${val}`]);
  }

}
