import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EmptyContentComponent, ExpandCollapseComponent } from '@mix/mix.ui';
import { TuiAccordionModule } from '@taiga-ui/kit';

import { SubWorkspaceControllerService } from '../../services';

@Component({
  selector: 'mix-sub-work-space-container',
  templateUrl: './sub-work-space-container.component.html',
  styleUrls: ['./sub-work-space-container.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    PortalModule,
    TuiAccordionModule,
    EmptyContentComponent,
    ExpandCollapseComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MixSubWorkSpaceContainerComponent {
  constructor(public subWorkSpaceController: SubWorkspaceControllerService) {}
}
