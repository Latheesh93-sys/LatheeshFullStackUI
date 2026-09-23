import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditTransactionRequest } from '../models/edit-transaction-request.model';
import { IsoDatePipe } from '../../../pipes/iso-date.pipe';

@Component({
  selector: 'app-edit-transaction',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-transaction.component.html',
  styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent implements OnInit,OnDestroy {

   paramsSubscription?:Subscription;
   editTransactionSubscription?:Subscription;
   id:string|null= null;
   transaction?:Transaction;
   constructor(private route:ActivatedRoute,private transactionService:TransactionService,
    private router : Router){

   }
   ngOnInit():void{
    this.paramsSubscription=this.route.paramMap.subscribe(
      {
        next:(params)=>{
          this.id=params.get('id');
          if(this.id){
            this.transactionService.getTransactionById(this.id).subscribe(
              {
                next:(response)=>{
                  this.transaction=response;
                  const pipe = new IsoDatePipe();
                  this.transaction.date = pipe.transform(this.transaction.date);
                }
              }
            )
          }
        }
      });
   }
   onFormSubmit():void{
    const updateTransactionRequest: EditTransactionRequest = {
      name: this.transaction?.name ?? '',
      userId: Number(localStorage.getItem('userid')),
      amount: this.transaction?.amount ?? 0,
      date: this.transaction?.date ?? '',
      paymentMethod: this.transaction?.paymentMethod ?? '',
      type: this.transaction?.type ?? ''
    };

      if(this.id)
      {
        this.editTransactionSubscription=this.transactionService.editTransaction(this.id,updateTransactionRequest)
        .subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/transactions');
          }
        })
      }
   }
   onDelete():void{
    if(this.id)
      {
        this.transactionService.deleteTransaction(this.id)
        .subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/transactions');
          }
        })
      }
   }
   
   ngOnDestroy(): void {
     this.paramsSubscription?.unsubscribe();
     this.editTransactionSubscription?.unsubscribe();
   }

}
