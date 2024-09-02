import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService, private _ToastrService:ToastrService,private _WishlistService:WishlistService){}

  products:Product[]=[];

  pageSize:number = 0;

  currentPage:number=1;

  total:number =0 ;

  
wishlistData:string[]=[];


ngOnInit(): void {
    this._EcomdataService.getAllProducts().subscribe({
      next:(response)=>{
        console.log(response);
        this.products = response.data;

        this.pageSize = response.metadata.limit ; 

        this.currentPage = response.metadata.currentPage ;

        this.total= response.results
      },
      error:(err) =>{
          console.log(err);
          
      },
    })


    this._WishlistService.getWishlist().subscribe({
      next:(response)=>{
        console.log(response);
        console.log("wishlist",response.data);//data -->[{id},{id}] --->["id","id"]
  
        const newData = response.data.map(  (item:any)=> item._id)
  
        console.log(newData);
  
        this.wishlistData = newData
  
        
  
  
  
        
      }
    })
}

addCart(id:string){
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);

      this._CartService.cartNumber.next(response.numOfCartItems)
      
      this._ToastrService.success(response.message,"Fresh Cart");
      
    },
  error:(err)=>{
      console.log(err);
      
  },
  })

}

addWishlist(productID:string):void{
  this._WishlistService.addToWishlist(productID).subscribe({
    next:(response)=>{
      console.log(response);

      this.wishlistData = response.data

      this._WishlistService.wishNumber.next(response.data.length)

      
    console.log(response.data.length);

      this._ToastrService.success(response.message,"Wish List");
      
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
  
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    } 

    pageChanged(event:any):void{
      console.log(event);

      this._EcomdataService.getAllProducts(event).subscribe({
        next:(response)=>{
          console.log(response);
          this.products = response.data;
  
          this.pageSize = response.metadata.limit ; 
  
          this.currentPage = response.metadata.currentPage ;
  
          this.total= response.results
        },
        error:(err) =>{
            console.log(err);
            
        },
      })
      

    }
}
