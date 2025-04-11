import { AfterViewInit, Component, inject, ViewChild, ElementRef, Inject, PLATFORM_ID, Input, OnChanges, SimpleChanges } from '@angular/core';
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
export class BarChartComponent implements AfterViewInit, OnChanges {
  @ViewChild('barChartCanvas') barChartCanvas!: ElementRef;
  @Input() type: 'sales' | 'engagement' | 'performance' = 'sales';
  @Input() colorScheme: string[] = ['#ed64a6', '#4c51bf'];
  @Input() scaleSettings: { xDisplay: boolean; yDisplay: boolean } = { xDisplay: true, yDisplay: true };


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private metricsService = inject(MockMetricsService);
  private chartInstance: Chart<'bar'> | null = null;

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const { default: zoomPlugin } = await import('chartjs-plugin-zoom');
      Chart.register(zoomPlugin);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      let dataObservable;
      //calling the mock service to get the data
      if (this.type === 'sales') {
        dataObservable = this.metricsService.getSalesData();
      } else if (this.type === 'engagement') {
        dataObservable = this.metricsService.getUserEngagement();
      } else {
        dataObservable = this.metricsService.getPerformanceStats();
      }
      dataObservable.subscribe((response) => {
        let metrics = response;
        const config: ChartConfiguration<'bar'> = {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
            datasets: [
              {
                label: metrics[0].year.toString(),
                data: metrics[0].data,
                backgroundColor: this.colorScheme[0],
                barThickness: 10
              },
              {
                label: metrics[1].year.toString(),
                data: metrics[1].data,
                backgroundColor: this.colorScheme[1],
                barThickness: 10
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
                  color: 'rgba(255,255,255,1)',
                },
              },
              title: {
                display: false,
                text: 'Orders Chart',
              },
              zoom: {
                zoom: {
                  wheel: {
                    enabled: true
                  },
                  pinch: {
                    enabled: true
                  },
                  mode: 'xy'
                },
                pan: {
                  enabled: true,
                  mode: 'x',
                  modifierKey: 'ctrl',
                }
              },
            },
            scales: {
              x: {
                display: this.scaleSettings.xDisplay,
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                },
              },
              y: {
                display: this.scaleSettings.yDisplay,
                grid: {
                  color: 'rgba(33, 37, 41, 0.3)',
                },
              },
            },
          },
        };

        const canvas = this.barChartCanvas.nativeElement as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          this.chartInstance = new Chart(ctx, config);
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['colorScheme'] && !changes['colorScheme'].firstChange) {
      this.updateChartColors();
    }
  }

  private updateChartColors(): void {
    //UPDATING THE COLORS OF THE CHART
    if (this.chartInstance && this.chartInstance.data.datasets.length >= 2) {
      this.chartInstance.data.datasets[0].backgroundColor = this.colorScheme[0];
      this.chartInstance.data.datasets[1].backgroundColor = this.colorScheme[1];
      this.chartInstance.update();
    }
  }

  resetZoom() {
    // Resetting the zoom level of the chart
    // This method is called when the reset button is clicked
    if (this.chartInstance) {
      this.chartInstance.resetZoom();
    }
  }


}