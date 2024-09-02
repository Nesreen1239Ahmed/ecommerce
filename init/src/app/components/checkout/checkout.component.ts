import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _FormBuilder:FormBuilder, private _ActivatedRoute:ActivatedRoute, private _CartService:CartService){}

  checkout:FormGroup = this._FormBuilder.group({
    details:[''],
    phone:['',[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
    city:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
  })

  cartId:any='';

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(params)=>{
          console.log(params.get('id'));

          this.cartId = params.get('id');


          
        }
      })
  }

  handleForm():void{
    console.log(this.checkout.value);

    this._CartService.checkOut(this.cartId,this.checkout.value).subscribe({
      next:(response)=>{
        if(response.status == "success")
          {
            console.log(response);
            window.open(response.session.url,'_self')
          }
       
        

      }
    })
    

  }

}
