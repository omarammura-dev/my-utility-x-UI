import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password-form',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './reset-password-form.component.html',
  styleUrl: './reset-password-form.component.css'
})
export class ResetPasswordFormComponent implements OnInit {
  error:string = ""
  message:String = ""
  isLoading:boolean = false
  newPassword = ""
  newPasswordRepeat = ""
  token:string = ""
  constructor(private route:ActivatedRoute,private router:Router, private authService:AuthService){
    
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!
    if (this.token === null){
      this.router.navigate(['/application/v1'])
    }
  }


  onSubmit(form:NgForm){
    this.isLoading = true
    let oldPassowrd = form.value.password
    let newPassword = form.value.newPassword
    let newPasswordRepeat = form.value.newPasswordRepeat

    if (newPassword !== newPasswordRepeat){
      this.error = "Your new Password does not match!"
    }

  this.authService.createNewPassword(oldPassowrd,newPassword,this.token).subscribe(
    {
      next: n => this.message = n.message,
      error: e => this.error = e.error.error,
    }
  )
  form.reset()
  this.isLoading = false
  }
}
