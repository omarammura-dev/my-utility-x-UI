import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [FormsModule,NgIf,NgClass],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {

  message:String = ""
  isError:boolean = false
  isLoading:Boolean = false


  constructor(private authService:AuthService){}

  onSubmit(form:NgForm){
    this.isLoading = true

    if(form.invalid) {
      return;
    }
    let email = form.value.email

    let resetPassObs = this.authService.sendResetPasswordLink(email)

    resetPassObs.subscribe(resData =>{
      this.message = resData.message
    },err =>{
      this.isError = true
      this.message = err
    })
    form.reset
    this.isLoading = false
  }
}
