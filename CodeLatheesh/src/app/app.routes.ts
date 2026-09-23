import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { TransactionListComponent } from './features/transaction/transaction-list/transaction-list.component';
import { AddTransactionComponent } from './features/transaction/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './features/transaction/edit-transaction/edit-transaction.component';




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
      { path: 'admin/transactions', loadComponent: () => import('./features/transaction/transaction-list/transaction-list.component').then(m => m.TransactionListComponent) },
      { path: 'admin/transactions/add', loadComponent: () => import('./features/transaction/add-transaction/add-transaction.component').then(m => m.AddTransactionComponent) },
      { path: 'admin/transactions/:id', loadComponent: () => import('./features/transaction/edit-transaction/edit-transaction.component').then(m => m.EditTransactionComponent)},
      // add more main app routes here
    ]
  },

  // Wildcard fallback
  { path: '**', redirectTo: 'login' }
];
