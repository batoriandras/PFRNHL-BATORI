import { Component, OnInit } from '@angular/core';
import { DashboardStats } from '../dashboard-stats';
import { DashboardServiceService } from '../dashboard-service.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.sass'
})
export class DashboardComponent implements OnInit {
  stats?: DashboardStats
  pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{ data: [] }]
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Havi rendelések száma',
        backgroundColor: '#0d6efd',
        borderRadius: 5,
      }
    ]
  }

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true }
    }
  }

  constructor(private dashboardService: DashboardServiceService) { }

  ngOnInit(): void {
    this.dashboardService.loadAll().subscribe({
      next: data => {
        this.stats = data
        this.setupPieChart()
        this.updateBarChart()
      },
      error: err => console.error('Hiba a statisztikák betöltésekor:', err)
    })
  }

  updateBarChart(): void {
    if (!this.stats) return

    const labels: string[] = []
    const values: number[] = []

    this.stats.monthlyOrderStats.forEach(stat => {
      labels.push(`${stat.year}-${stat.month.toString().padStart(2, '0')}`)
      values.push(stat.orderCount)
    });

    this.barChartData.labels = labels
    this.barChartData.datasets[0].data = values
  }

  setupPieChart(): void {
    if (!this.stats?.topServices) return

    this.pieChartData = {
      labels: this.stats.topServices.map(s => s.serviceName),
      datasets: [
        {
          data: this.stats.topServices.map(s => s.orderCount),
        }
      ]
    }
  }
}
