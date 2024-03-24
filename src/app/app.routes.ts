import { Routes } from '@angular/router';
import { LinkComponent } from './link/linkList/link.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './auth/auth.guard';
import { CreateLinkComponent } from './link/create-link/create-link.component';

export const routes: Routes = [
   
    { path:'auth',component:AuthComponent},
    { path:'application/v1',component:DashboardComponent,canActivate:[AuthenticationGuard], children:[
        { path:'links', component:LinkComponent, children:[
            { path:'create-link', component:CreateLinkComponent},
        ]},
       
    ]},
];
