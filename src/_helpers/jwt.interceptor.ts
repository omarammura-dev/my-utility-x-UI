import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../app/auth/auth.service";
import { Observable, Subscription, catchError, exhaustMap, switchMap, take, tap } from "rxjs";
import { environment } from "../environments/environment.development";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{


    
    constructor(private authService: AuthService){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return this.authService.user.pipe(
        take(1),
        switchMap(user => {
          if (!user) {
            return next.handle(req);
          }
  
          const authReq = req.clone({
            headers: new HttpHeaders().set('Authorization', user.token as string)
          });
  
          return next.handle(authReq);
        })
      );
    }
  }