import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { provideStore } from '@ngrx/store';
import { dashboardReducer } from './store/dashboard/dashboard.reducer';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent),
        providers: [
          provideStore({ dashboard: dashboardReducer }),
        //   provideEffects(), 
        ]
      },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '/dashboard' }
];
