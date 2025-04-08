import { createAction, props } from '@ngrx/store';

export const setSection = createAction(
  '[Dashboard] Set Section',
  props<{ section: string }>()
);

export const setSalesChart = createAction(
  '[Dashboard] Set Sales Chart',
  props<{ chart: string }>()
);

export const setEngagementChart = createAction(
  '[Dashboard] Set Engagement Chart',
  props<{ chart: string }>()
);

export const setPerformanceChart = createAction(
  '[Dashboard] Set Performance Chart',
  props<{ chart: string }>()
);
