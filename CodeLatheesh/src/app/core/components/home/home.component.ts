import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { CategoryService } from '../../../features/category/services/category.service';
import { CategoryColl, UserSummary } from '../../../features/category/models/user-summary';
import { ToastrService } from 'ngx-toastr';
import { IsoDatePipe } from '../../../pipes/iso-date.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,IsoDatePipe],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  topExpenses: CategoryColl[] = [];
  totalIncome: number = 0;
  totalExpense: number = 0;
  totalInvestment: number = 0;
  balance: number = 0;

  summaryCards: { label: string; value: number; colorClass: string }[] = [];

  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: []
  };

  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userid'));

    this.categoryService.getUserSummary(userId).subscribe({
      next: (summary: UserSummary) => {
        this.totalIncome = summary.totalIncome;
        this.totalExpense = summary.totalExpense;
        this.totalInvestment = summary.totalInvestment;
        this.balance = this.totalIncome - (this.totalExpense + this.totalInvestment);
        this.topExpenses = summary.topExpenses;

        this.SetSummaryCards();
        this.SetPieChartData();
        this.SetBarChartData();
      },
      error: (error) => {
        this.toastr.error('User data loading failed');
      }
    });
  }

  SetSummaryCards(): void {
    this.summaryCards = [
      { label: 'Total Income', value: this.totalIncome, colorClass: 'text-success' },
      { label: 'Total Expense', value: this.totalExpense, colorClass: 'text-danger' },
      { label: 'Total Investment', value: this.totalInvestment, colorClass: 'text-info' },
      { label: 'Balance', value: this.balance, colorClass: 'text-primary' }
    ];
  }

  SetPieChartData(): void {
    this.pieChartData = {
      labels: ['Income', 'Expense', 'Investment'],
      datasets: [{
        data: [this.totalIncome, this.totalExpense, this.totalInvestment],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
      }]
    };
  }

  SetBarChartData(): void {
    this.barChartData = {
      labels: this.topExpenses.map(tx => tx.name),
      datasets: [{
        label: 'Amount',
        data: this.topExpenses.map(tx => tx.amount),
        backgroundColor: '#dc3545'
      }]
    };
  }
}
