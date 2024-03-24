import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-create-link',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-link.component.html',
  styleUrl: './create-link.component.css'
})
export class CreateLinkComponent implements OnInit{
 
  ngOnInit(): void {
  }

  CreateLink(form:NgForm){
    if (!form.valid) {
      return
    }
    const title = form.value.title
    const link = form.value.link
  }
}
