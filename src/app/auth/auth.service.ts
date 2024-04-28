import { HttpClient, HttpInterceptorFn } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Subject,tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    message?:string,
    user:User,
    token:string,
    error?:string
}

export interface ResetPasswordResponseData{
    message:String
}


@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User|null>(null)
    private _isAuthenticated = new BehaviorSubject<boolean>(false);
    constructor(private http: HttpClient, private router:Router){}

    signup(username:string, email:string,password:string){
      return this.http.post<AuthResponseData>(environment.apiUrl+'user/register',
        {
            username:username,
            email:email,
            password:password
        })
        .pipe(tap(resData => {
           this.handleAuthentication(resData.user.ID,resData.user.Username,resData.user.Email,resData.token)
        }))
    }



    login(email:string,password:string){
        return this.http.post<AuthResponseData>(environment.apiUrl+'user/login', {
            email:email,
            password:password
        })
        .pipe(tap(resData => {
            this.handleAuthentication(resData.user.ID,resData.user.Username,resData.user.Email,resData.token)
         }))
        
    }

    createNewPassword(oldPassowrd:string,newPassword:string,token:string){
        console.log(newPassword)
        return this.http.post<ResetPasswordResponseData>(environment.apiUrl+'user/reset-password/confirm',{
            oldpassword:oldPassowrd,
            newpassword:newPassword
        },
        {
            params:{
                "token":token
            }

        }).pipe(tap())
    }

    sendResetPasswordLink(email:String){
        return this.http.post<ResetPasswordResponseData>(environment.apiUrl+'user/reset-password',{
            email:email  
        }).pipe(tap())
    }

    private handleAuthentication(userId:string,username:string,email:string, token:string){
        const expirationDate = new Date(new Date().getTime() + (7200 * 1000))
        const user = new User(userId, username, email, token, expirationDate);
        this.user.next(user)
        this._isAuthenticated.next(true)
        localStorage.setItem("userData",JSON.stringify(user))
    }


    autoLogin(){
      try{
        const userData:{
            ID:string,
            Username:string,
            Email:string,
            _token:string,
            _tokenExpiration:string
        } = JSON.parse(localStorage.getItem("userData") as string);
        
            if(!userData){
                return;
            }
            const loadedUser = new User(userData.ID,userData.Username,userData.Email,userData._token,new Date(userData._tokenExpiration))
            if(loadedUser.token){
                this.user.next(loadedUser);
            }

      } catch(err){
        console.log(err);  
    }
    }


    isAuthenticated() {
        const user  = JSON.parse(localStorage.getItem("userData") as string);
        if (user && new Date(user._tokenExpiration) > new Date()) {
            const loadedUser = new User(user.ID, user.Username, user.Email, user._token, new Date(user._tokenExpiration));
            this.user.next(loadedUser);
          this._isAuthenticated.next(true);
        } else {
          this._isAuthenticated.next(false);
        }
        return this._isAuthenticated.asObservable();
      }

 
      logout(){
        this.user.next(null)
        this._isAuthenticated.next(false)
        localStorage.removeItem("userData")
        this.router.navigate(['/auth'])
      }
}
