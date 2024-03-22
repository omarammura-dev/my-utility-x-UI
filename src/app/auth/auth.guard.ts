import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router"
import { Observable, map } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable({
    providedIn: 'root'
  })
export  class AuthenticationGuard {
  
    constructor(private router: Router,private authService:AuthService) {}
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
       return this.authService.user.pipe(map(user => {
            return !!user;
        }))
    }
  }
  