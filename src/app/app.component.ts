import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './utils/header/header.component';
import { SidebarComponent } from './utils/sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { FooterComponent } from './utils/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  RouterOutlet, RouterLinkActive, RouterLink,HeaderComponent,SidebarComponent,HttpClientModule,FooterComponent,DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  
  isLoggedIn = false
  
  constructor(private authService:AuthService,private router:Router){}
  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(bool =>{
      this.isLoggedIn = bool
    })
    if (this.isLoggedIn) {
      this.router.navigate(['application/v1'])
    }
    }
  }
