import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/shared/interfaces/cart';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private _CartService:CartService){}

  cartDetails:Cart={} as Cart;

  ngOnInit(): void {
      this._CartService.getUserCart().subscribe({
        next:(response)=>{
          console.log(response);
          console.log(response.data);
          this.cartDetails=response.data //{totalcartprice,products:[{count,price,product:{}}]}
          

        },
        error:(err)=>{
          console.log(err);
          
        }
      })
  }
  removeCartItem(id:string):void{
    this._CartService.removeItem(id).subscribe({
      next:(response)=>{
        this._CartService.cartNumber.next(response.numOfCartItems)
        console.log(response);
        console.log(response.data);
        this.cartDetails=response.data;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  changeCount(id:string , count:number):void{
  if(count > 0)
    {
      this._CartService.updateCartProduct(id,count).subscribe({
        next:(response)=>{
          console.log(response); 
          console.log(response.data); 
          this.cartDetails= response.data
        },
        error:(err)=>{
          console.log(err);
          
  
        }
      })
    }
  }
}
