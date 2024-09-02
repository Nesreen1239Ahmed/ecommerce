import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService:WishlistService,private _CartService:CartService, private _ToastrService:ToastrService){}

  products:Product[]=[];

  wishlistData:string[]=[];

  ngOnInit(): void {


    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        console.log("wishlist",response.data);//data -->[{id},{id}] --->["id","id"]

        this.products = response.data
  
        const newData = response.data.map(  (item:any)=> item._id)
  
        console.log(newData);
  
        this.wishlistData = newData
  
        
  
  
  
        
      }
    })

      
  }

  addCart(id:string):void{
    this._CartService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
  
        this._CartService.cartNumber.next(response.numOfCartItems)
  
        // console.log(this._CartService.cartNumber);
        
      
        this._ToastrService.success(response.message,"Fresh Cart");
        
  
      },
      error:(err)=>{
        console.log(err);
        
  
      }
    })
  }

  addWishlist(productID:string):void{
    this._WishlistService.addToWishlist(productID).subscribe({
      next:(response)=>{
        console.log(response);
    
   
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    } 

    removeWishlist(productID:string):void{
      this._WishlistService.removeFromWishlist(productID).subscribe({
        next:(response)=>{
          console.log(response);
    
          this.wishlistData = response.data

          this._WishlistService.wishNumber.next(response.data.length)
          
          this._ToastrService.success(response.message,"Wish List");

          // this._WishlistService.getWishlist().subscribe({
          //   next:(response)=>{
          //     this.products = response.data
          //   }
          // })

          console.log("before",this.products);
        
          const newProductsData = this.products.filter( (item) => this.wishlistData.includes(item._id))

          this.products = newProductsData

          console.log("after",newProductsData);
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
      } 

  


}
