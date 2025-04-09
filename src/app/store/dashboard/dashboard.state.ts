import { DashboardState } from './dashboard.reducer';

export const initialDashboardState: DashboardState = {
  selectedSection: 'all',
  selectedSalesChart: 'line',
  selectedEngagementChart: 'line',
  selectedPerformanceChart: 'line',
  colorScheme: ['#ed64a6', '#4c51bf'],
  scaleType: 'normal',
};
