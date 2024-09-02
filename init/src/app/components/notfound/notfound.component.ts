import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

  constructor(private _Router:Router){}

  navigatBack():void{
    this._Router.navigate(['/home'])
  }

  notfoundImage:string="./assets/images/error.svg";

}
