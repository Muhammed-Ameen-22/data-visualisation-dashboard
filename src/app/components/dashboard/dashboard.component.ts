import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    BarChartComponent,
    LineChartComponent,
    PieChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidebarCollapsed = false;

  selectedSection: string = 'all';

  selectedSalesChart: string = 'line';
  selectedEngagementChart: string = 'line';
  selectedPerformanceChart: string = 'line';

  onCollapseChanged(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  checkWindowWidth(): boolean {
    return window.innerWidth <= 768;
  }

}
