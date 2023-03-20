import { SignUp, Login } from './../interfaces/data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  showLogin: boolean = false;
  authError: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seller: SellerService) { }

  ngOnInit() {
    // this.seller.reloadSeller();
  }

  signUp(data: SignUp) {
    this.seller.userSignUp(data);
  }

  login(data: Login) {
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = "Email or password not correct";
      }
    })
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

}
