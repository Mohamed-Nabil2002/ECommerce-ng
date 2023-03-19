import { SignUp } from './../interfaces/data-type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerService: SellerService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  signUp(data: SignUp) {
    console.log(data);
    this.sellerService.userSignUp(data).subscribe((res) => {
      if (!res) return;
      this.router.navigate(['seller-home'])
    })
  }

}
