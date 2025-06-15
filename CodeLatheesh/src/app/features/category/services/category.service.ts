import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { EditCategoryRequest } from '../models/edit-category-request.model';
import { UserSummary } from '../models/user-summary';

export interface PaginatedResult<T> {
  items: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}

  addCategory(model:AddCategoryRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`,model);
  }

  getCategoryById(id:string):Observable<Category>
  {
    return this.http.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  editCategory(id:string,editCategoryRequest:EditCategoryRequest):Observable<Category>
  {
    return this.http.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}`,editCategoryRequest);
  }

  deleteCategory(id:string):Observable<Category>
  {
    return this.http.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
  }

  getUserSummary(userId:Number):Observable<UserSummary>
  {
    return this.http.get<UserSummary>(`${environment.apiBaseUrl}/api/categories/usersummary/${userId}`);
  }

  getFilteredCategories(
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
  ): Observable<PaginatedResult<Category>> {
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

    return this.http.get<PaginatedResult<Category>>(`${environment.apiBaseUrl}/api/categories/filtered`, { params });
  }

  
}
