import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CreationComponent } from '../../../components/creation/creation.component';

@Component({
  selector: 'mix-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CreationComponent]
})
export class PageCreateComponent {}
