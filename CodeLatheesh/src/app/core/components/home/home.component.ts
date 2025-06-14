import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ CommonModule,BaseChartDirective ],
  providers: [provideCharts(withDefaultRegisterables())],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  totalIncome = 50000;
  totalExpense = 35000;
  balance = this.totalIncome - this.totalExpense;

  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Rent', 'Food', 'Shopping', 'Others'],
    datasets: [{
      data: [12000, 10000, 8000, 5000],
      backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0']
    }]
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Income', 'Expense'],
    datasets: [{
      label: 'Amount',
      data: [this.totalIncome, this.totalExpense],
      backgroundColor: ['#28a745', '#dc3545']
    }]
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  recentTransactions = [
    { date: new Date(), category: 'Salary', amount: 25000, type: 'Income' },
    { date: new Date(), category: 'Rent', amount: 12000, type: 'Expense' },
    { date: new Date(), category: 'Groceries', amount: 4000, type: 'Expense' }
  ];
}
