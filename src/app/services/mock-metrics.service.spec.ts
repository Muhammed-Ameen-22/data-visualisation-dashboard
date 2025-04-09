import { TestBed } from '@angular/core/testing';

import { MockMetricsService } from './mock-metrics.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MockMetricsService', () => {
  let service: MockMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()) 
      ]
    });
    service = TestBed.inject(MockMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
