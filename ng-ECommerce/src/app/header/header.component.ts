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
  constructor(private router: Router) { }

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

}
