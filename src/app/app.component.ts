import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './design/header/header.component';
import { SidebarComponent } from './design/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './design/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  RouterOutlet, RouterLinkActive, RouterLink,HeaderComponent,SidebarComponent,HttpClientModule,FooterComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  isLoggedIn = false

  constructor(){}
  // ngOnInit(): void {
  //   this.authService.autoLogin();
  //   this.authService.isAuthenticated().subscribe(isAuthenticated=>
  //     {
  //       this.isLoggedIn = isAuthenticated
  //       if(this.isLoggedIn){
  //         this.router.navigate(['/application/v1'])
  //       }
  //     })
  //   }
  }
