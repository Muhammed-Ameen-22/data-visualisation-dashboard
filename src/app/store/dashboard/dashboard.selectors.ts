import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedSection = createSelector(
  selectDashboardState,
  (state) => state.selectedSection
);

export const selectSalesChart = createSelector(
  selectDashboardState,
  (state) => state.selectedSalesChart
);

export const selectEngagementChart = createSelector(
  selectDashboardState,
  (state) => state.selectedEngagementChart
);

export const selectPerformanceChart = createSelector(
  selectDashboardState,
  (state) => state.selectedPerformanceChart
);

export const selectColorScheme = createSelector(
  selectDashboardState,
  (state) => state.colorScheme
);


