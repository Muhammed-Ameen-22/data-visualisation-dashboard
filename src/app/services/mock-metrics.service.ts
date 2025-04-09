import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockMetricsService {

  constructor(private http: HttpClient) {}
  
  getSalesData(): Observable<any> {
    return this.http.get<any>('assets/data/mock-data.json').pipe(
      map(data => data.salesData)
    );
  }

  getUserEngagement(): Observable<any> {
    return this.http.get<any>('assets/data/mock-data.json').pipe(
      map(data => data.userEngagement)
    );
  }

  getPerformanceStats(): Observable<any> {
    return this.http.get<any>('assets/data/mock-data.json').pipe(
      map(data => data.performanceStats)
    );
  }

}
