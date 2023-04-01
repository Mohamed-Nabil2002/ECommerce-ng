import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SignUp, Login } from './../interfaces/data-type';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseURl = "http://localhost:3000";
  @Output() invalidUserAuth = new EventEmitter<boolean>(false);
  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(user: SignUp) {
    this.http.post(`${this.baseURl}/users`, user, { observe: 'response' })
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

  userLogin(data: Login): void {
    this.http
      .get<SignUp[]>(
        `${this.baseURl}/users?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        if (result && result.body && result.body.length) {
          this.invalidUserAuth.emit(false);
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['/']);
        } else this.invalidUserAuth.emit(true);
      });
  }
}
