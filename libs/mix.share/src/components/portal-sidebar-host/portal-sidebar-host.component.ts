import { CommonModule } from '@angular/common';
import { Component, ElementRef, Injector } from '@angular/core';
import {
  AbstractTuiPortalHostComponent,
  AbstractTuiPortalService
} from '@taiga-ui/cdk';

import { PortalSidebarControlService } from '../../services';

@Component({
  selector: 'mix-portal-sidebar-host',
  templateUrl: './portal-sidebar-host.component.html',
  styleUrls: ['./portal-sidebar-host.component.scss'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: AbstractTuiPortalService,
      useExisting: PortalSidebarControlService
    }
  ]
})
export class PortalSidebarHostComponent extends AbstractTuiPortalHostComponent {
  constructor(
    injector: Injector,
    elementRef: ElementRef<HTMLElement>,
    portalService: AbstractTuiPortalService,
    public sidebarControl: PortalSidebarControlService
  ) {
    super(injector, elementRef, portalService);
  }
}
