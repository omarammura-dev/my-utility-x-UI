import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Link } from "./link.model";
import { environment } from "../../../environments/environment.development";
import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { switchMap, take } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class LinkService{


    constructor(private http:HttpClient,private authService:AuthService){}

    getLinks() {
        return this.authService.user.pipe(
            take(1),
            switchMap(user => {
                return this.http.get<Link[]>(environment.apiUrl + 'url', {
                    headers: new HttpHeaders().set('Authorization', user!.token as string)
                });
            })
        );
    }

    

    createNewLink(){
        return this.authService.user.pipe(
            take(1),
            switchMap(user => {
                return this.http.post<Link[]>(environment.apiUrl + 'url/shrik', {
                    headers: new HttpHeaders().set('Authorization', user!.token as string)
                });
            })
        );
    }
}