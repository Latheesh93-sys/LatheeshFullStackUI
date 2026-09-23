import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transaction-list',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent implements OnInit {

  transactions: Transaction[] = [];
  totalCount = 0;
  months: string[] = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];


  // Filters
  filter = {
    month: new Date().getMonth() + 1,
    type: 'All',
    paymentMethod: 'All',
    sortBy: 'date',
    sortOrder: 'desc',
    pageNumber: 1,
    pageSize: 10,
  };
   

  constructor(private transactionService: TransactionService) {
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    const userId = Number(localStorage.getItem('userid'));
    this.transactionService.getFilteredTransactions(userId, this.filter).subscribe((res) => {
      this.transactions = res.items;
      this.totalCount = res.totalCount;
    });
  }
  onPageChange(page: number) {
    this.filter.pageNumber = page;
    this.loadData();
  }

  onFilterChange() {
    this.filter.pageNumber = 1;
    this.loadData();
  }
}
