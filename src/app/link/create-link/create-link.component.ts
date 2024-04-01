import { Component, Injectable, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LinkService, ResponseData } from '../linkList/link.service';
import { Observable } from 'rxjs';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-create-link',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './create-link.component.html',
  styleUrl: './create-link.component.css'
})



export class CreateLinkComponent implements OnInit{

 
  
  error:String = ""
  success:String = "" 

  constructor(private linkService:LinkService){}
  ngOnInit(): void {
  }

  CreateLink(form:NgForm){
    let createLink:Observable<ResponseData>;
    if (!form.valid) {
      return
    }
    const title = form.value.title
    const link = form.value.link
    
    console.log(link);
    

    createLink = this.linkService.createNewLink(title,link)

    createLink.subscribe(resData =>{
      this.success = resData.message
    },err =>{
      this.error = err.message
    })

    form.reset()

  }
}
