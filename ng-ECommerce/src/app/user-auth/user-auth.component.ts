import { UserService } from './../services/user.service';
import { SignUp } from './../interfaces/data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.userAuthReload;
  }

  signUp(data: SignUp) {
    this.userService.userSignUp(data);
  }

}
