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
  error:String = ""
  isLoading:Boolean = false


  constructor(private authService:AuthService){}

  onSubmit(form:NgForm){
    this.isLoading = true

    if(form.invalid) {
      return;
    }
    let email = form.value.email

    let resetPassObs = this.authService.sendResetPasswordLink(email)

    resetPassObs.subscribe(
      {
        next: c => this.message = c.message,
        error: e => this.error = e.error.error
      }
    )
    form.reset()
    this.isLoading = false
  }
}
