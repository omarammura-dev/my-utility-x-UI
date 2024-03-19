import { Routes } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path:'links', component:LinkComponent },
    { path:'auth',component:AuthComponent},
    { path:'application/v1',component:DashboardComponent},
];
