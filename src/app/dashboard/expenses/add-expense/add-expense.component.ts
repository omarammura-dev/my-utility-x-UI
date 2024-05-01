import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, NgForm} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ExpenseData } from '../expenses-list/expenses-list.component';
import { ExpensesService } from '../expenses.service';
import { throwError } from 'rxjs';
@Component({
  selector: 'app-add-expense',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    FormsModule
  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent {
  constructor(
    public dialogRef: MatDialogRef<AddExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExpenseData,
    private expenseService:ExpensesService
  ) {}


  addExpense(form:NgForm){
    if(!form.valid){
      alert("Form is invalid!")
      return
    }
    this.expenseService.addExpense(this.data.name,this.data.type,this.data.price).subscribe(
      {
        next: n => {
          alert("added!");
        },
        error: e => throwError(e)
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}