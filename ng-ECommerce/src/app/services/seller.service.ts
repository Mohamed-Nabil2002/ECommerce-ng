import { Router } from '@angular/router';
import { SignUp, Login } from './../interfaces/data-type';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SellerService {
  baseUrl: string = 'http://localhost:3000';
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError = new EventEmitter<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: SignUp) {
    this.http.post(`${this.baseUrl}/seller`, data, { observe: "response" })
      .subscribe((result: any) => {
        // this.isSellerLoggedIn.next(true)
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      })
  }

  userLogin(data: Login) {
    this.http.get(`${this.baseUrl}/seller?email=${data.email}&password=${data.password}`, { observe: "response" })
      .subscribe((result: any) => {
       if (result && result.body && result.body.length) {
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
        } else {
         this.isLoginError.emit(true)
       }
      })
  }

  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }

}
