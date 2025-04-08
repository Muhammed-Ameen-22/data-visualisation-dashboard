import { AfterViewInit, Component, inject, ViewChild, ElementRef, Inject, PLATFORM_ID, Input } from '@angular/core';
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
  @Input() type: 'sales' | 'engagement' | 'performance' = 'sales';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
        const config: ChartConfiguration<'bar'> = {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [
              {
                label: metrics[0].year.toString(),
                data: metrics[0].data,
                backgroundColor: '#ed64a6',
                barThickness: window.innerWidth < 768 ? 8 : 30
              },
              {
                label: metrics[1].year.toString(),
                data: metrics[1].data,
                backgroundColor: '#4c51bf',
                barThickness: window.innerWidth < 768 ? 8 : 30
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
              // zoom:{
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