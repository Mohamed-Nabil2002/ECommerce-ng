import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        if (localStorage.getItem("seller") && event.url.includes("seller")) {
          this.menuType = "seller";
        } else {
          this.menuType = "default";
        }
      }
    })
  }

}
