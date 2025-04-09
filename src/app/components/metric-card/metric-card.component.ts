import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss'],
})
export class MetricCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() icon = '';
  @Input() iconBgColor = '';
  @Input() trend: 'up' | 'down' = 'up';
  @Input() trendValue = '';
  @Input() trendText = '';
}
