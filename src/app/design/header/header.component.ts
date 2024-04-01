import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor(private auhtService:AuthService){}

  isLoggedIn = false

  ngOnInit(): void {
    this.auhtService.autoLogin()
    this.auhtService.isAuthenticated().subscribe(isAuthenticated =>{
      this.isLoggedIn = isAuthenticated
    })
  }
 

}
