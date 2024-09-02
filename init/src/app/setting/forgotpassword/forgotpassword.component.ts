import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  constructor(private _FormBuilder:FormBuilder){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;


      forgot :FormGroup = this._FormBuilder.group({
 
    email:[null,[Validators.required, Validators.email]],
  
    
  })







}
