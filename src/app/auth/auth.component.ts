import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NgIf,FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})


export class AuthComponent {

  isLoginMode:Boolean = true
  isLoading:Boolean = false;
  error: string = "";

  constructor(private authService:AuthService,private router:Router){}

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form:NgForm){
    this.isLoading = true
    if(!form.valid){
      return;
    }
    const  username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
   

    let authObs:Observable<AuthResponseData>;

    if(this.isLoginMode)
    {
      authObs = this.authService.login(email,password);
    }
    else{
      authObs = this.authService.signup(username,email,password);
    }

    authObs.subscribe(resdata => {
      this.router.navigate(['/application/v1'])
    },
    err =>{
      console.log(err);
      this.error = err.message
    })
    form.reset()
    this.isLoading = false
  
  }
}
