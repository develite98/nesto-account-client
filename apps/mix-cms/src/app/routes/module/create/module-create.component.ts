import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CreationComponent } from '../../../components/creation/creation.component';

@Component({
  selector: 'mix-module-create',
  templateUrl: './module-create.component.html',
  styleUrls: ['./module-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, CreationComponent]
})
export class ModuleCreateComponent {}
