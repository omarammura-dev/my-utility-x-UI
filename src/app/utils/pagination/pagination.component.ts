import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpensesListComponent } from '../../dashboard/expenses/expenses-list/expenses-list.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  @Input() totalItems:any;
  @Input() currentPage:any;
  @Input() itemsPerPage:any;
  @Output() onClick:EventEmitter<number> = new EventEmitter();
  totalPages = 0
  pages:number[] = []

  constructor(){}
ngOnInit(): void {
  if (this.totalItems) {
    this.totalPages = Math.ceil(this.totalItems/this.itemsPerPage)
    this.pages = Array.from({length: this.totalPages},(_,i)=> i+1)
  }
}

pageClicked(page:number){
  this.onClick.emit(page)
}
}
