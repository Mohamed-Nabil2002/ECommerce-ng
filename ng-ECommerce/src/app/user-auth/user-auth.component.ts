import { ProductService } from './../services/product.service';
import { Cart } from './../interfaces/cart';
import { Product } from './../interfaces/product';
import { UserService } from './../services/user.service';
import { SignUp, Login } from './../interfaces/data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {
  showLoggin: boolean = true;
  authError: string = "";
  constructor(private userService: UserService, private productService: ProductService) { }

  ngOnInit() {
    this.userService.userAuthReload;
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }

  login(data: Login) {
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe(result => {
      if (result) {
        this.authError = "Please Enter Valid User Details";
      } else {
        this.localCartToRemoteCart();
      }
    })
  }

  openSignUp() {
    this.showLoggin = false;
  }

  openLogin() {
    this.showLoggin = true;
  }

  private localCartToRemoteCart(): void {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    if (data) {
      let cartDataList: Product[] = JSON.parse(data);
      cartDataList.forEach((product: Product, index: number) => {
        let cartData: Cart = {
          ...product,
          productId: product.id,
          userId,
        };
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result: any) => {
            if (result) console.log('Item stored in DB');
          });
          if (cartDataList.length === index + 1)
            localStorage.removeItem('localCart');
        }, 500);
      });
    }
  }

}
