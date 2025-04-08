import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PieChartComponent } from '../pie-chart/pie-chart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { selectEngagementChart, selectPerformanceChart, selectSalesChart, selectSelectedSection } from '../../store/dashboard/dashboard.selectors';

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
  store = inject(Store<AppState>);
  selectedSection = 'all';
  selectedSalesChart = 'line';
  selectedEngagementChart = 'line';
  selectedPerformanceChart = 'line';
  isSidebarCollapsed = false;
  selectedSection$ = this.store.select(selectSelectedSection);
  salesChartType$ = this.store.select(selectSalesChart);
  engagementChartType$ = this.store.select(selectEngagementChart);
  performanceChartType$ = this.store.select(selectPerformanceChart);

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

  onCollapseChanged(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
  }

  checkWindowWidth(): boolean {
    return window.innerWidth <= 768;
  }

}
