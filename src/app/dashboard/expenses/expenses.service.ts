import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from './expense.model';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, Subscription, catchError, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  public expenses = new BehaviorSubject<Expense[]>([])


  constructor(private http:HttpClient,private authService:AuthService){}

  getExpenses() {
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if (user) {
          return this.http.get<Expense[]>(environment.apiUrl + 'expense/all', {
            headers: new HttpHeaders().set('Authorization', user.token as string)
          });
        } else {
          return of([]);
        }
      }),
      tap(expense => this.expenses.next(expense)),
      catchError(e => {
        console.error(e);
        return of([]);
      })
    );
  }

  addExpense(expenseName:string, expenseType:string,expensePrice:number){
    return this.authService.user.pipe(
      take(1),
      switchMap(user => {
        if(user){
          return this.http.post<Expense[]>(environment.apiUrl + 'expense/add',
          {
            expenseName:expenseName,
            expenseType:expenseType.toUpperCase(),
            price: +expensePrice
          },
          {
            headers: new HttpHeaders().set('Authorization', user.token as string)
          }
        );}
        return "INVALID_TOKEN"
      }),
      catchError(e => {
        return e;
      })
    );
  }
}
