import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from '../../../../environments/environment';
import { EditCategoryRequest } from '../models/edit-category-request.model';
import { UserSummary } from '../models/user-summary';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) {}

  addCategory(model:AddCategoryRequest):Observable<void>
  {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories`,model);
  }

  getAllCategories(userId:Number):Observable<Category[]>
  {
    return this.http.get<Category[]>(`${environment.apiBaseUrl}/api/categories/${userId}`);
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

  
  
}
