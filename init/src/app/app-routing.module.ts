import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  component:BlankLayoutComponent, children:[
    {path:'',redirectTo:'home', pathMatch:'full' },
    {path:'home', component:HomeComponent , title:'Home' },
    {path:'cart', component:CartComponent, title:'Cart' },
    {path:'wishlist', component:WishlistComponent, title:'WishList' },
    {path:'setting', loadChildren:()=>import('./setting/setting.module').then( (m)=>m.SettingModule ), title:'setting' },

    {path:'products',component:ProductsComponent, title:'Products' },

    {path:'allorders',component:AllordersComponent, title:'All Orders' },

    {path:'checkout/:id',component:CheckoutComponent, title:'CheckOut' },

    {path:'details/:id',component:DetailsComponent, title:'Details' },
    {path:'brands',component:BrandsComponent, title:'Brands' },
    {path:'categories',component:CategoriesComponent, title:'Categories' }
  ]},
  {path:'',component:AuthLayoutComponent, children:[
    {path:'login',component:LoginComponent, title:'Log In' },
    {path:'register', component:RegisterComponent, title:'Register' }
  ]},
  {path:'**',component:NotfoundComponent, title:'Not Found Page' }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
