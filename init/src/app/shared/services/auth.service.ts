// import {AuthService} from 'src/app/shared/services/auth.service';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private HttpClient:HttpClient,private _Router:Router) { }

  userData:any='';

  saveUserData(){

    if(localStorage.getItem('eToken') != null){//token 
      let encodeToken:any = localStorage.getItem('eToken');
     let decodeToken = jwtDecode(encodeToken);

     this.userData = decodeToken;

     console.log(decodeToken);

     console.log(this.userData);

     console.log(decodeToken);

    let userID:string = this.userData.id

     console.log(this.userData.id);
     
     

    } 
  }

  //logout

  logOut():void{
    localStorage.removeItem('eToken')
    this._Router.navigate(['/login'])

  }



  setRegister(userData:object):Observable<any>
  {
   return this.HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,userData)
  }

  setLogin(userData:object):Observable<any>
  {
   return this.HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,userData)
  }



  userID:string = this.userData.id

  getOrders(userID:string):Observable<any>
  {

    // let encodeToken:any = localStorage.getItem('eToken');
    // let decodeToken = jwtDecode(encodeToken);

    // this.userData = decodeToken;

    // console.log(decodeToken);

    // console.log(this.userData);

    // console.log(decodeToken);



    // console.log(this.userData.id);
    
  
    return  this.HttpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
  }


}
