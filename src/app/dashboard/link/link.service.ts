import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Link } from "./linkList/link.model";
import { environment } from "../../../environments/environment.development";
import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { BehaviorSubject, catchError, of, switchMap, take, tap } from "rxjs";


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
        return this.authService.user.pipe(
          take(1),
          switchMap(user => {
            if (user) {
              return this.http.get<Link[]>(environment.apiUrl + 'url', {
                headers: new HttpHeaders().set('Authorization', user.token as string)
              });
            } else {
              return of([]);
            }
          }),
          tap(links => this.links.next(links)),
          catchError(e => {
            console.error(e);
            return of([]);
          })
        );
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