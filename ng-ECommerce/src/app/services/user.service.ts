import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignUp } from './../interfaces/data-type';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
baseURl = "http://localhost:3000/users"
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    this.http.post(this.baseURl, user, {observe: 'response'})
    .subscribe(result => {
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.body))
        this.router.navigate(['/']);
      }
    });
  }

  userAuthReload() {
    if (localStorage.getItem("user")) {
      this.router.navigate(['/']);
    }
  }
}
