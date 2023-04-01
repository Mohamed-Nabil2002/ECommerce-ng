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
  constructor(private userService: UserService) { }

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
      }
    })
  }

  openSignUp() {
    this.showLoggin = false;
  }

  openLogin() {
    this.showLoggin = true;
  }

}
