import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
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
   

  constructor(private categoryService: CategoryService) {
  }
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    const userId = Number(localStorage.getItem('userid'));
    this.categoryService.getFilteredCategories(userId, this.filter).subscribe((res) => {
      this.categories = res.items;
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
