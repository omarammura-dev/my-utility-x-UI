import { Routes } from '@angular/router';
import { LinkComponent } from './link/link.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
    { path:'links', component:LinkComponent },
    { path:'auth',component:AuthComponent},
];
