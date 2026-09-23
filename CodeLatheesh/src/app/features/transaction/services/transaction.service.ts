import { Injectable } from '@angular/core';
import { AddTransactionRequest } from '../models/add-transaction-request.model';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from '../models/transaction.model';
import { environment } from '../../../../environments/environment';
import { EditTransactionRequest } from '../models/edit-transaction-request.model';
import { UserSummary } from '../models/user-summary';

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http:HttpClient) {}

  addTransaction(model:AddTransactionRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/transactions`,model);
  }

  getTransactionById(id:string):Observable<Transaction>
  {
    return this.http.get<Transaction>(`${environment.apiBaseUrl}/api/transactions/${id}`);
  }

  editTransaction(id:string,editTransactionRequest:EditTransactionRequest):Observable<Transaction>
  {
    return this.http.put<Transaction>(`${environment.apiBaseUrl}/api/transactions/${id}`,editTransactionRequest);
  }

  deleteTransaction(id:string):Observable<Transaction>
  {
    return this.http.delete<Transaction>(`${environment.apiBaseUrl}/api/transactions/${id}`);
  }

  getUserSummary(userId:number,month:number):Observable<UserSummary>
  {
    return this.http.get<UserSummary>(`${environment.apiBaseUrl}/api/transactions/usersummary/${userId}/${month}`);
  }

  getFilteredTransactions(
    userId: number,
    filters: {
      month?: number;
      type?: string;
      paymentMethod?: string;
      sortBy?: string;
      sortOrder?: string;
      pageNumber?: number;
      pageSize?: number;
    }
  ): Observable<PaginatedResult<Transaction>> {
    let params = new HttpParams().set('userId', userId.toString());

    if (filters.month !== undefined) {
      params = params.set('month', filters.month.toString());
    }
    if (filters.type) {
      params = params.set('type', filters.type);
    }
    if (filters.paymentMethod) {
      params = params.set('paymentMethod', filters.paymentMethod);
    }
    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }
    if (filters.sortOrder) {
      params = params.set('sortOrder', filters.sortOrder);
    }
    if (filters.pageNumber) {
      params = params.set('pageNumber', filters.pageNumber.toString());
    }
    if (filters.pageSize) {
      params = params.set('pageSize', filters.pageSize.toString());
    }

    return this.http.get<PaginatedResult<Transaction>>(`${environment.apiBaseUrl}/api/transactions/filtered`, { params });
  }

  
}
