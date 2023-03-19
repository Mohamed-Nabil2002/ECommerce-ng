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
    private activatedRoute: ActivatedRoute,
    private seller: SellerService) { }

  ngOnInit() {
    this.seller.reloadSeller();
  }

  signUp(data: SignUp) {
    this.sellerService.userSignUp(data);
  }


}
