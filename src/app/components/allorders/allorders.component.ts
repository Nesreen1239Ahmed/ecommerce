import { Component } from '@angular/core';
import { Orders } from 'src/app/shared/interfaces/orders';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent {

  constructor(private _AuthService:AuthService){}


ItemOrders:Orders={} as Orders

  getUserOrder(userID:string):void{
    this._AuthService.getOrders(userID).subscribe({
      next:(response)=>{
        console.log(response);
        
      },
      error(err) {
          console.log(err);
          
      },
    })
  }



 
   

   



}
