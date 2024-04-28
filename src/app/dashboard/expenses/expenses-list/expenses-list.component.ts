import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../expenses.service';
import { BehaviorSubject, reduce, switchMap, take } from 'rxjs';
import { Expense } from '../expense.model';
import * as d3 from 'd3';
import { DatePipe, NgFor } from '@angular/common';
import { PaginationComponent } from '../../../utils/pagination/pagination.component';
@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [NgFor,DatePipe,PaginationComponent],
  templateUrl: './expenses-list.component.html',
  styleUrl: './expenses-list.component.css'
})
export class ExpensesListComponent implements OnInit{

  private margin = 50;
  private width = 500 - (this.margin * 2);
  private height = 400 - (this.margin * 2);
  itemsPerPage = 4
  currentPage = 1
  totalItems = 0
  expenses:Expense[] = []

  constructor(private expenseService:ExpensesService){}

  
  ngOnInit(): void {
    this.expenseService.getExpenses().pipe(
      take(1),
    ).subscribe(
      {
        next:expense => {
          const data = expense.reduce((acc:any, cur) => {
            let key = cur.expenseType
            if (!acc[key]) {
              acc[key] = 0
            }
            acc[key] += cur.price
            return acc;
        }, {});

          this.expenses = expense;
          this.totalItems = this.expenses.length
          const barChart = this.createSvg("bar");
          const plotChart = this.createSvg("plot"); 
          this.drawBars(data,barChart);
          let monthlyData = this.calculateMonths()
          const dataArray = Object.entries(monthlyData).map(([month, price]) => ({month: +month, price: price}));
          this.drawScatterPlot(dataArray,plotChart)          
        }
      }
    )
  }


  calculateMonths(){
    let months:any = {};
    this.expenses.forEach(element => {
      let key = new Date(element.expenseDate).getMonth()
      if (months[key+1] === undefined) {
        months[key+1] = 0;
      }
      if (element.price !== undefined) {
        months[key+1] += element.price as number 
      }
    });
    return months
  }

private createSvg(id:string) {
  return d3.select("figure#"+id)
  .append("svg")
  .attr("width", this.width + (this.margin * 2))
  .attr("height", this.height + (this.margin * 2))
  .append("g")
  .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}


private drawBars(data: any[],svg:any): void {
const dataArray = Object.entries(data).map(([expenseType, price]) => ({expenseType, price}));
console.log(dataArray);
const x = d3.scaleBand()
  .range([0, this.width])
  .domain(dataArray.map(d => d.expenseType))
  .padding(0.8);

  svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x))
  .selectAll("text")
  .attr("transform", "translate(-10,0)rotate(-45)")
  .style("text-anchor", "end");

  const y = d3.scaleLinear()
  .domain([0, d3.max(dataArray.filter(d => !isNaN(d.price)), d => d.price)])
  .range([this.height, 0]);

  svg.append("g")
  .call(d3.axisLeft(y));


  svg.selectAll("rect")
  .data(dataArray)
  .enter()
  .filter((d: any) => d.price !== undefined)
  .append("rect")
  .attr("x", (d: any) => x(d.expenseType))
  .attr("width", x.bandwidth())
  .attr("y", (d: any) => !isNaN(d.price) ? y(d.price) : 0)
  .attr("height", (d: any) => !isNaN(d.price) ? this.height - y(d.price) : 0)
  .attr("fill", "#d04a35");
}
private drawScatterPlot(dataArray:any[],svg:any){
  
  var x = d3.scaleLinear()
    .domain([1, 12])
    .range([0, this.width]);
  svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x));
  
  var y = d3.scaleLinear()
    .domain([0, d3.max(dataArray, d => d.price)])
    .range([this.height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  var line = d3.line()
    .x((d: any) => x(d.month))
    .y((d: any) => y(d.price));

  dataArray.sort((a, b) => a.month - b.month);

  svg.append("path")
    .datum(dataArray)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", line);
  
  svg
    .append("g")
    .selectAll("dot")
    .data(dataArray)
    .enter()
    .append("circle")
      .attr("cx", (d:any) => x(d.month)) 
      .attr("cy", (d:any) => y(d.price)) 
      .attr("r", 5)
      .attr("fill", "#69b3a2")
}

changePage(page:number){
  this.currentPage = page
}
}
