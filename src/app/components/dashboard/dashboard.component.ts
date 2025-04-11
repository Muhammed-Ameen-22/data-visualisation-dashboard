import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { MetricCardComponent } from '../metric-card/metric-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { selectColorScheme, selectEngagementChart, selectPerformanceChart, selectSalesChart, selectSelectedSection } from '../../store/dashboard/dashboard.selectors';

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
    PieChartComponent,
    MetricCardComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  store = inject(Store<AppState>);
  isSidebarCollapsed = false;
  selectedSection$ = this.store.select(selectSelectedSection);
  salesChartType$ = this.store.select(selectSalesChart);
  engagementChartType$ = this.store.select(selectEngagementChart);
  performanceChartType$ = this.store.select(selectPerformanceChart);
  selectedColorScheme = this.store.select(selectColorScheme);

  //color schemes for the charts, if needed we can add more
  colorSchemes = {
    greenBlue: ['#34d399', '#3b82f6'],
    redYellow: ['#f87171', '#fbbf24'],
    pinkIndigo: ['#ed64a6', '#4c51bf'],
  };

  // Dispatches NgRx actions to update the dashboard state based on user interactions
  // such as section selection, chart type, color scheme, and sidebar state.

  onSectionChange(section: string) {
    this.store.dispatch(DashboardActions.setSection({ section }));
  }

  onSalesChartChange(chart: string) {
    this.store.dispatch(DashboardActions.setSalesChart({ chart }));
  }

  onEngagementChartChange(chart: string) {
    this.store.dispatch(DashboardActions.setEngagementChart({ chart }));
  }

  onPerformanceChartChange(chart: string) {
    this.store.dispatch(DashboardActions.setPerformanceChart({ chart }));
  }

  onColorSchemeChange(scheme: string[]) {
    this.store.dispatch(DashboardActions.setColorScheme({ colorScheme: scheme }));
  }

  onCollapseChanged(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  checkWindowWidth(): boolean {
    return window.innerWidth <= 768;
  }

  compareColorSchemes = (a: string[], b: string[]) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };

}
