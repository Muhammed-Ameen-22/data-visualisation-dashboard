import { AfterViewInit, Component, inject, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ArcElement,
  Tooltip,
  Legend,
  PieController
} from 'chart.js';
import { MockMetricsService } from '../../services/mock-metrics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChartCanvas') pieChartCanvas!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private metricsService = inject(MockMetricsService);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.metricsService.getMetrics().subscribe((response) => {
        const metrics = response.metrics;

        const config: ChartConfiguration<'pie'> = {
          type: 'pie',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: `Distribution in ${metrics[0].year}`,
                data: metrics[0].data,
                backgroundColor: [
                  '#ed64a6',
                  '#4c51bf',
                  '#38b2ac',
                  '#f6ad55',
                  '#9f7aea',
                  '#68d391',
                  '#f56565',
                ],
                borderColor: '#1a202c',
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: 'rgba(255,255,255,0.7)',
                },
              },
              tooltip: {
                enabled: true,
              },
              title: {
                display: false,
              },
            },
          },
        };

        const canvas = this.pieChartCanvas.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          new Chart(ctx, config);
        }
      });
    }
  }
}
