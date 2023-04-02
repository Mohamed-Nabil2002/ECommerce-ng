import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "seller-auth",
    component: SellerAuthComponent
  },
  {
    path: "seller-home",
    component: SellerHomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "seller-add-product",
    component: SellerAddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "seller-update-product/:id",
    component: SellerUpdateProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "search/:query",
    component: SearchComponent,
  },
  {
    path: "details/:productId",
    component: ProductDetailsComponent,
  },
  {
    path: "user-auth",
    component: UserAuthComponent,
  },
  {
    path: "cart-page",
    component: CartPageComponent,
  },
  {
    path: "checkout",
    component: CheckoutComponent,
  },
  {
    path: "my-orders",
    component: MyOrdersComponent,
  },
  {
    path: "**",
    pathMatch: "full",
    component: PageNotFoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
