import { TestBed } from '@angular/core/testing';

import { MockMetricsService } from './mock-metrics.service';

describe('MockMetricsService', () => {
  let service: MockMetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockMetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
