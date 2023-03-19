import { AuthGuard } from './auth.guard';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
