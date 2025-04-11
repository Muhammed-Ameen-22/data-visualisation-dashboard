import { createReducer, on } from '@ngrx/store';
import { initialDashboardState } from './dashboard.state';
import * as DashboardActions from './dashboard.actions';

export interface DashboardState {
  selectedSection: string;
  selectedSalesChart: string;
  selectedEngagementChart: string;
  selectedPerformanceChart: string;
  colorScheme: string[];
}

export const dashboardReducer = createReducer(
  initialDashboardState,
  on(DashboardActions.setSection, (state, { section }) => {
    console.log('[Dashboard Reducer] setSection:', section);
    return {
      ...state,
      selectedSection: section
    };
  }),
  on(DashboardActions.setSalesChart, (state, { chart }) => {
    console.log('[Dashboard Reducer] setSalesChart:', chart);
    return {
      ...state,
      selectedSalesChart: chart
    };
  }),
  on(DashboardActions.setEngagementChart, (state, { chart }) => {
    console.log('[Dashboard Reducer] setEngagementChart:', chart);
    return {
      ...state,
      selectedEngagementChart: chart
    };
  }),
  on(DashboardActions.setPerformanceChart, (state, { chart }) => {
    console.log('[Dashboard Reducer] setPerformanceChart:', chart);
    return {
      ...state,
      selectedPerformanceChart: chart
    };
  }),
  on(DashboardActions.setColorScheme, (state, { colorScheme }) => ({
    ...state,
    colorScheme
  }))
);

