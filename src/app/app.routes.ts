import { Routes } from '@angular/router';
import { LinkComponent } from './link/linkList/link.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateLinkComponent } from './link/create-link/create-link.component';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [ 
    { path:'auth',component:AuthComponent},
    { path:'auth/reset-password',component:ResetPasswordComponent},
    { path:'application/v1',component:DashboardComponent,canActivate:[AuthGuard], children:[
        { path:'links', component:LinkComponent, children:[
            { path:'create-link', component:CreateLinkComponent},
        ]},
       
    ]},
  
];
