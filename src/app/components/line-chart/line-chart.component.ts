import { AfterViewInit, Component, inject, ViewChild, ElementRef, Inject, PLATFORM_ID, Input } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { MockMetricsService } from '../../services/mock-metrics.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef;
  @Input() type: 'sales' | 'engagement' | 'performance' = 'sales';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  private metricsService = inject(MockMetricsService);

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { default: zoomPlugin } = await import('chartjs-plugin-zoom');
      Chart.register(zoomPlugin);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let dataObservable;

      if (this.type === 'sales') {
        dataObservable = this.metricsService.getSalesData();
      } else if (this.type === 'engagement') {
        dataObservable = this.metricsService.getUserEngagement();
      } else {
        dataObservable = this.metricsService.getPerformanceStats();
      }
      dataObservable.subscribe((response) => {
        let metrics =response;
        const config: ChartConfiguration<'line'> = {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug'],
            datasets: [
              {
                label: metrics[0].year.toString(),
                data: metrics[0].data,
                borderColor: '#ed64a6',
                backgroundColor: 'rgba(237, 100, 166, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
              {
                label: metrics[1].year.toString(),
                data: metrics[1].data,
                borderColor: '#4c51bf',
                backgroundColor: 'rgba(76, 81, 191, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
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
                text: 'Performance Chart',
              },
            //   zoom:{
            //   zoom: {
            //     wheel: {
            //       enabled: true
            //     },
            //     pinch: {
            //       enabled: true
            //     },
            //     mode: 'xy'
            //   },
            //   pan: {
            //     enabled: true,
            //     mode: 'x', 
            //     modifierKey: 'ctrl', 
            //   }
            // },
             
            },
            scales: {
              x: {
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                },
                ticks: {
                  color: 'rgba(255,255,255,0.6)',
                },
              },
              y: {
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                },
                ticks: {
                  color: 'rgba(255,255,255,0.6)',
                },
              },
            },
          },
        };

        const canvas = this.lineChartCanvas.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          new Chart(ctx, config);
        }
      });
    }
  }
}
