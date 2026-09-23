import { Component, OnDestroy } from '@angular/core';
import { AddTransactionRequest } from '../models/add-transaction-request.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-transaction',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnDestroy {

  model: AddTransactionRequest;
  private addTransactionSubscription?: Subscription
  constructor(private transactionService: TransactionService,private router:Router) {
    this.model = {
  name: '',
  userId: Number(localStorage.getItem('userid')),
  amount: 0,
  date: '',
  paymentMethod: '',
  type: ''
};
  }
  onFormSubmit() {
    this.addTransactionSubscription=this.transactionService.addTransaction(this.model).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/transactions');
      },
      error: (error) => {

      }

    });
  }

  ngOnDestroy(): void {
    this.addTransactionSubscription?.unsubscribe();
  }
}
