import { AfterViewInit, Component, inject, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { MockMetricsService } from '../../services/mock-metrics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-bar-chart',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private metricsService = inject(MockMetricsService);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.metricsService.getMetrics().subscribe((response) => {
        const metrics = response.metrics;

        const config: ChartConfiguration<'bar'> = {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: metrics[0].year.toString(),
                data: metrics[0].data,
                backgroundColor: '#ed64a6',
                barThickness: 8,
              },
              {
                label: metrics[1].year.toString(),
                data: metrics[1].data,
                backgroundColor: '#4c51bf',
                barThickness: 8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'rgba(0,0,0,.4)',
                },
              },
              title: {
                display: false,
                text: 'Orders Chart',
              },
            },
            scales: {
              x: {
                display: false,
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                  // @ts-ignore
                  borderDash: [2],
                },
              },
              y: {
                display: true,
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                  // @ts-ignore
                  borderDash: [2],
                },
              },
            },
          },
        };

        const canvas = this.barChartCanvas.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          new Chart(ctx, config);
        }
      });
    }
  }
}