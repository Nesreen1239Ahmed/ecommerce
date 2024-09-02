import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  wishNumber:BehaviorSubject<number> = new BehaviorSubject(0)

  baseUrl:string=`https://ecommerce.routemisr.com`

 myHeaders:any={token:localStorage.getItem('eToken')};


  addToWishlist(productID:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl + `/api/v1/wishlist`,
      {
        "productId":productID
      },
      {
        headers :this.myHeaders
      }

    )
  }

  getWishlist():Observable<any>{
    return this._HttpClient.get(this.baseUrl + `/api/v1/wishlist`, 
    {
      headers :this.myHeaders
    }
)
    
   
  }

  
 removeFromWishlist(productID:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `/api/v1/wishlist/${productID}`, 
    {
      headers :this.myHeaders
    }
)
    
   
  }
}
