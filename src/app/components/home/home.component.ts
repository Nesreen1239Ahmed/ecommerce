import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/interfaces/product';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/shared/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/shared/services/wishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 constructor(private _EcomdataService:EcomdataService, private _CartService:CartService, private _ToastrService:ToastrService,
  private _WishlistService:WishlistService
 ){

 }
products:Product[]=[];

categories:any[]=[];

searchTerm:string='';

wishlistData:string[]=[];

mainSlider: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  items:1,
  nav: false
}

categoriesSliderOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  autoplay:true,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.

//get All products
  this._EcomdataService.getAllProducts().subscribe({
    next:(response) => {
      console.log(response); 
      this.products = response.data;
    },

  });
  
  this._EcomdataService.getGategories().subscribe({
    next:(response)=>{

      console.log(response.data);

      this.categories = response.data
      

    }
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

addCart(id:string):void{
  this._CartService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);

      this._CartService.cartNumber.next(response.numOfCartItems)

  

      
    
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

    this.wishlistData = response.data

  
    

    this._WishlistService.wishNumber.next(response.data.length)

    console.log(response.data.length);
    

    this._ToastrService.success(response.message,"Fresh Cart");
    
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
}
