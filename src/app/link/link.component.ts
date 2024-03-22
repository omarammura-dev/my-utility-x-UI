import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkService } from './link.service';
import { AuthService } from '../auth/auth.service';
import { Link } from './link.model';
import { NgFor } from '@angular/common';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { ButtonComponent } from '../design/basic-elements/button/button.component';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink, NgFor,TruncatePipe,ButtonComponent],
  templateUrl: './link.component.html',
  styleUrl: './link.component.css'
})
export class LinkComponent implements OnInit {
linksArray: Link[] = []
constructor(private linkService:LinkService,private authService:AuthService){}

ngOnInit(): void {
  console.log('ngOnInit called');
  this.linkService.getLinks().subscribe(links => {
    this.linksArray = links
  }, error => {
    console.error(error);
  });
}
}
