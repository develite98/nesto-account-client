import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TuiButtonModule } from '@taiga-ui/core';

import { SubWorkspaceControllerService } from '../../services';

@Component({
  selector: 'mix-window-toolbar',
  templateUrl: './window-toolbar.component.html',
  styleUrls: ['./window-toolbar.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule]
})
export class MixWindowToolbarComponent {
  constructor(public subWPService: SubWorkspaceControllerService) {}
}
