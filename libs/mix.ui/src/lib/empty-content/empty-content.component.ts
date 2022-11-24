import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-empty-content',
  templateUrl: './empty-content.component.html',
  styleUrls: ['./empty-content.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class EmptyContentComponent {}
