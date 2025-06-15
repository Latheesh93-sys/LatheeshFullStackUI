import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';




export const routes: Routes = [
  //  Redirect '' to login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  //  Auth routes (login, register, forgot-password etc.)
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', loadComponent: () => import('./login/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./register/register/register.component').then(m => m.RegisterComponent) },
      // add more auth routes here
    ]
  },

  //  Main app routes (dashboard, profile etc.)
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'admin/Home', loadComponent: () => import('./core/components/home/home.component').then(m => m.HomeComponent) },
      { path: 'admin/categories', loadComponent: () => import('./features/category/category-list/category-list.component').then(m => m.CategoryListComponent) },
      { path: 'admin/categories/add', loadComponent: () => import('./features/category/add-category/add-category.component').then(m => m.AddCategoryComponent) },
      { path: 'admin/categories/:id', loadComponent: () => import('./features/category/edit-category/edit-category.component').then(m => m.EditCategoryComponent)},
      // add more main app routes here
    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' }
];
