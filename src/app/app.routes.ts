import { Routes } from '@angular/router';
import { LinkComponent } from './dashboard/link/linkList/link.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateLinkComponent } from './dashboard/link/create-link/create-link.component';
import { AppComponent } from './app.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password/reset-password.component';
import { AuthGuard } from './auth/auth.guard';
import { ResetPasswordFormComponent } from './auth/reset-password-form/reset-password-form.component';
import { ExpensesListComponent } from './dashboard/expenses/expenses-list/expenses-list.component';

export const routes: Routes = [
    { path:'auth',component:AuthComponent},
    { path:'auth/reset-password',component:ResetPasswordComponent},
    { path:'auth/reset-password/confirm/:token',component:ResetPasswordFormComponent},
    { path:'application/v1',component:DashboardComponent,canActivate:[AuthGuard], children:[
        { path:'links', component:LinkComponent, children:[
            { path:'create-link', component:CreateLinkComponent},
        ]},
        {
            path:'expenses-statistics', component:ExpensesListComponent
        }

    ]},

];
