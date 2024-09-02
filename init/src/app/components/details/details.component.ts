import { Product } from './../../shared/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/shared/services/cart.service';
import { EcomdataService } from 'src/app/shared/services/ecomdata.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute,private _EcomdataService:EcomdataService,private _CartService:CartService,private _ToastrService:ToastrService){}

  productDetails:Product = {} as Product;


  productSlider: OwlOptions = {
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


  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params);
          let idProduct:any = params.get('id')

          //api --> idProduct

          this._EcomdataService.getProductDetails(idProduct).subscribe({
            next:(response)=>{
              console.log(response);
              this.productDetails = response.data;
              
            }
          })

          console.log(idProduct);
          
       
          

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

}
