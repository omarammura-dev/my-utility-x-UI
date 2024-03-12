import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { BehaviorSubject, Subject,tap } from "rxjs";
import { User } from "./user.model";

export interface AuthResponseData {
    message?:string,
    user:User,
    token:string,
}



@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User|null>(null)

    constructor(private http: HttpClient){}

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

    private handleAuthentication(userId:string,username:string,email:string, token:string){
        const expirationDate = new Date(new Date().getTime() + (7200 * 1000))
        const user = new User(userId, username, email, token, expirationDate);
        this.user.next(user)
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
            console.log(loadedUser);
            
            if(loadedUser.token){
                this.user.next(loadedUser);
            }

      } catch(err){
        console.log(err);  
    }
    }


    isAuthenticated():Boolean{
      const user  = JSON.parse(localStorage.getItem("userData") as string)

      if(new Date(user._tokenExpiration) >  new Date() )
      {
        return true;
      }
      return false;
    }
}
