import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent,RouterModule.forRoot([])],
      providers: [provideHttpClient(withInterceptorsFromDi()),
        provideMockStore({
          selectors: [
            { selector: 'selectSelectedSection', value: 'Sales' },
            { selector: 'selectSalesChart', value: 'bar' },
            { selector: 'selectEngagementChart', value: 'line' },
            { selector: 'selectPerformanceChart', value: 'pie' },
            { selector: 'selectColorScheme', value: ['#34d399', '#3b82f6'] }
          ]
        }),
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
