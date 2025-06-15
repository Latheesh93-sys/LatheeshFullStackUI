import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditCategoryRequest } from '../models/edit-category-request.model';
import { IsoDatePipe } from '../../../pipes/iso-date.pipe';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit,OnDestroy {

   paramsSubscription?:Subscription;
   editCategorySubscription?:Subscription;
   id:string|null= null;
   category?:Category;
   constructor(private route:ActivatedRoute,private categoryService:CategoryService,
    private router : Router){

   }
   ngOnInit():void{
    this.paramsSubscription=this.route.paramMap.subscribe(
      {
        next:(params)=>{
          this.id=params.get('id');
          if(this.id){
            this.categoryService.getCategoryById(this.id).subscribe(
              {
                next:(response)=>{
                  this.category=response;
                  const pipe = new IsoDatePipe();
                  this.category.date = pipe.transform(this.category.date);
                }
              }
            )
          }
        }
      });
   }
   onFormSubmit():void{
    const updateCategoryRequest: EditCategoryRequest = {
      name: this.category?.name ?? '',
      userId: Number(localStorage.getItem('userid')),
      amount: this.category?.amount ?? 0,
      date: this.category?.date ?? '',
      paymentMethod: this.category?.paymentMethod ?? '',
      type: this.category?.type ?? ''
    };

      if(this.id)
      {
        this.editCategorySubscription=this.categoryService.editCategory(this.id,updateCategoryRequest)
        .subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/categories');
          }
        })
      }
   }
   onDelete():void{
    if(this.id)
      {
        this.categoryService.deleteCategory(this.id)
        .subscribe({
          next:(response)=>{
            this.router.navigateByUrl('/admin/categories');
          }
        })
      }
   }
   
   ngOnDestroy(): void {
     this.paramsSubscription?.unsubscribe();
     this.editCategorySubscription?.unsubscribe();
   }

}
