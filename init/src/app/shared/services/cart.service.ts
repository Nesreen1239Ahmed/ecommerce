import { MyHttpInterceptor } from './../../my-http.interceptor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
MyHttpInterceptor
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }


  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);



  myHeaders:any={token:localStorage.getItem('eToken')};



  addToCart(productId:string):Observable<any>
  {
    return this._HttpClient.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    {
      productId : productId
    }
    ,
    {
      headers:this.myHeaders
    }


    )
  }

  getUserCart():Observable<any> {
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`
   ,{
    headers:this.myHeaders
   }
    )

  }

  removeItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
    ,{
      headers:this.myHeaders
     }
  )

  }

  updateCartProduct(idProduct:string,newCount:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${idProduct}`,
      {
        count:newCount
      }
      ,{
        headers:this.myHeaders
       }
    )
  }

  checkOut(cartId:string,userData:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,
    {
      "shippingAddress":userData
    }
    ,{
      headers:this.myHeaders
     }
  )
  }

}
