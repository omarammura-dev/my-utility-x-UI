import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Link } from "./link.model";
import { environment } from "../../../environments/environment.development";
import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { BehaviorSubject, switchMap, take, tap } from "rxjs";


export interface ResponseData {
    message:string,
  }


@Injectable({
    providedIn: 'root',
  })
export class LinkService{
    private links = new BehaviorSubject<Link[]>([]);

    constructor(private http:HttpClient,private authService:AuthService){}

    getLinks() {
        this.authService.user.pipe(
            take(1),
            switchMap(user => {
                return this.http.get<Link[]>(environment.apiUrl + 'url', {
                    headers: new HttpHeaders().set('Authorization', user!.token as string)
                });
            })
        ).subscribe(links => {
            this.links.next(links)
        }, err =>{
            return err
        });
        return this.links.asObservable();
    }

    

    createNewLink(name:String, url:String){
        return this.authService.user.pipe(
            take(1),
            switchMap(user => {
                return this.http.post<ResponseData>(environment.apiUrl + 'url/shrink',  
                { name: name, url: url },
                {
                    headers: new HttpHeaders().set('Authorization', user!.token as string),
                }
                );
            }),
            tap(()=>{
                this.getLinks();
            })
        );
    }
}