import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LinkService } from './link.service';
import { AuthService } from '../../auth/auth.service';
import { Link } from './link.model';
import { NgFor, NgIf } from '@angular/common';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { ButtonComponent } from '../../design/basic-elements/button/button.component';
import { CreateLinkComponent } from '../create-link/create-link.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink, NgFor,TruncatePipe,ButtonComponent,CreateLinkComponent,RouterLinkActive,RouterOutlet,NgIf],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit {
getUrlLink = environment.getShortLink  
linksArray: Link[] = []
isCreateLinkRoute = false;
constructor(private linkService:LinkService,private authService:AuthService,private router:Router){}

ngOnInit(): void {

  this.router.events.subscribe( event =>{
    if(event instanceof NavigationEnd){
      this.isCreateLinkRoute = this.router.url.endsWith('/create-link');
    }
  })
  this.linkService.getLinks().subscribe(links =>{
    this.linksArray =links
  })
}

  redirectToShortUrl(shortUrl:String){
    window.location.href = environment.getShortLink+shortUrl
  }
}
