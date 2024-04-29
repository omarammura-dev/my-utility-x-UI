import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ExpensesListComponent } from '../../dashboard/expenses/expenses-list/expenses-list.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor,NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  @Input() totalItems!: Observable<number>;
  @Input() currentPage:any;
  @Input() itemsPerPage:any;
  @Output() onClick:EventEmitter<number> = new EventEmitter();
  totalPages = 0
  pages:number[] = []

  constructor(){}
ngOnInit(): void {
    this.totalItems.subscribe(total => {
      this.totalPages = Math.ceil(total / this.itemsPerPage);
      this.pages = Array.from({length: this.totalPages}, (_, i) => i + 1);
    });
}

pageClicked(page:number){
  if(page <= this.totalPages) this.onClick.emit(page)
}
}
