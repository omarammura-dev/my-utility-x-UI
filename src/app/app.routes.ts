import { Routes } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './auth/auth.guard';

export const routes: Routes = [
   
    { path:'auth',component:AuthComponent},
    { path:'application/v1',component:DashboardComponent,canActivate:[AuthenticationGuard], children:[
        { path:'links', component:LinkComponent},
    ]},
];
