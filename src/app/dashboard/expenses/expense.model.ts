export class Expense {
    constructor(
        public ID:string,
        public expenseName:string,
        public expenseType:string,
        public expenseDate:string,
        public userId:string,
        public price:number
    ){}
}