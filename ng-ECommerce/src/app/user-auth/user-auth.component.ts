import { SignUp } from './../interfaces/data-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  signUp(data: SignUp) {
    console.log(data);
  }

}
