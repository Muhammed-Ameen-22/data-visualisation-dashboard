import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartComponent],
      providers: [provideHttpClient(withInterceptorsFromDi())]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
