import { CartService } from 'src/app/shared/services/cart.service';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-nav-blank',
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.css']
})
export class NavBlankComponent implements OnInit {
  constructor(private _AuthService:AuthService,private _CartService:CartService, private _WishlistService:WishlistService){}

  cartCount:number=0;

  wishCount:number=0;

  ngOnInit(): void {
   this._CartService.cartNumber.subscribe({
    next:(data)=>{
      this.cartCount = data ;
    }


   })

   this._WishlistService.wishNumber.subscribe({
    next:(data)=>{
      this.wishCount = data;
    }
   })



   this._CartService.getUserCart().subscribe({
    next:(response)=>{
    this._CartService.cartNumber.next(response.numOfCartItems)
      
    }
   })

   this._WishlistService.getWishlist().subscribe({
    next:(response)=>{
      this._WishlistService.wishNumber.next(response.data.length)
    }
   })
  }



  logOutUser():void{
    this._AuthService.logOut();

  }

}
