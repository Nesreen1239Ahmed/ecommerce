import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './../../shared/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
Validators
//input ---from control
//inputs---fromGroup
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService, private _Router:Router,private _FormBuilder:FormBuilder){}


  msgError:string='';
  isLoading:boolean=false;

  // registerForm:FormGroup = new FormGroup({
  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required, Validators.email]),
  //   password:new FormControl(null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
  //   rePassword:new FormControl(null,[Validators.required,  Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  // });

  registerForm:FormGroup = this._FormBuilder.group({
    name:[null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
    email:[null,[Validators.required, Validators.email]],
    password:[null,[Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/)]],
    rePassword:[null],
    phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]]
  }, {validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void {

    let password = group.get('password');
    let rePassword= group.get('rePassword');

    if (rePassword?.value == null ||  rePassword?.value == '')
    {
      rePassword?.setErrors({required:true})

    }

    else if(password?.value != rePassword?.value)
      {
        rePassword?.setErrors({mismatch:true})
      }



  }

  

  handleForm():void{
    console.log(this.registerForm);
    console.log(this.registerForm.value);


  if(this.registerForm.valid){

    this.isLoading =true;

    this._AuthService.setRegister(this.registerForm.value).subscribe({
      next:(response)=> {
        console.log(response);


        if(response.message == 'success'){ //login

          this.isLoading =false;

          this._Router.navigate(['/login'])

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
  else
  {
    this.registerForm.markAllAsTouched();
  }

   

  }

}
