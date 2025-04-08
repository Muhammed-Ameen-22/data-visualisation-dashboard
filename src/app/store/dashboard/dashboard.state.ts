import { DashboardState } from './dashboard.reducer';

export const initialDashboardState: DashboardState = {
  selectedSection: 'all',
  selectedSalesChart: 'line',
  selectedEngagementChart: 'line',
  selectedPerformanceChart: 'line'
};
