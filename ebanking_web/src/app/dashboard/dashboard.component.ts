import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import {DashboardService} from '../services/dashboard.service';
import {BaseChartDirective} from 'ng2-charts';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective,],
  template: `
    <div class="container">
      <h2>Dashboard</h2>
      <div *ngIf="stats">
        <canvas baseChart
                [data]="barChartData"
                [type]="barChartType"
                [options]="barChartOptions">
        </canvas>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 50px auto; padding: 20px; }
    canvas { max-width: 100%; }
  `]
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  stats: any;
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true, title: { display: true, text: 'Count' } } },
    plugins: { legend: { display: true, position: 'top' }, title: { display: true, text: 'Banking Statistics' } }
  };

  ngOnInit() {
    this.dashboardService.getStatistics().subscribe(data => {
      this.stats = data;
      this.barChartData = {
        labels: ['Customers', 'Accounts', 'Operations'],
        datasets: [{
          data: [data.totalCustomers, data.totalAccounts, data.totalOperations],
          label: 'Statistics',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          borderColor: ['#1E88E5', '#43A047', '#FB8C00'],
          borderWidth: 1
        }]
      };
    });
  }
}
