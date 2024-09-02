import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private _AuthService:AuthService,private _Router:Router,private _FormBuilder:FormBuilder){}

  msgError:string='';
  isLoading:boolean=false;

  // loginForm:FormGroup = new FormGroup({
  //   email:new FormControl(null,[Validators.required, Validators.email]),
  //   password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)])
  // });

  loginForm:FormGroup =this._FormBuilder.group({
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]]


  })


  handleForm():void{
    console.log(this.loginForm);
    console.log(this.loginForm.value);

    
  if(this.loginForm.valid){

    this.isLoading =true;

    this._AuthService.setLogin(this.loginForm.value).subscribe({

      next:(response)=> {
      
        if(response.message == 'success'){ //home

          this.isLoading =false;

         
          localStorage.setItem('eToken',response.token);

          this._AuthService.saveUserData();
          
          console.log(response);
          //home
          this._Router.navigate(['/home'])

        }
        
          
      },
      error:(erro:HttpErrorResponse)=>{
        console.log(erro);
        console.log(erro.error.message);

        this.isLoading =false;

        this.msgError = erro.error.message;


        

      }
     
      
    })
    
  }

  else{
    this.loginForm.markAllAsTouched();
  }

   

  }
  
}
