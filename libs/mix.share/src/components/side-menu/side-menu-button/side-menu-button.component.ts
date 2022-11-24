import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { VerticalDisplayPosition } from '@mix/mix.lib';
import { TuiHostedDropdownModule } from '@taiga-ui/core';

import { IconsModule } from '../../../../src/icons.module';
import { MixToolbarMenu } from '../side-menu.component';
import { SideMenuService } from '../side-menu.service';

@Component({
  selector: 'mix-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['../side-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, IconsModule, TuiHostedDropdownModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SideMenuButtonComponent implements OnInit {
  public isShowSubMenuOnHover = false;
  @Input() public currentSelectedItem: MixToolbarMenu | undefined;
  @Input() public menu!: MixToolbarMenu;
  @Output() public selectMenu: EventEmitter<MixToolbarMenu> =
    new EventEmitter();

  @HostBinding('style.margin') public margin!: string;

  constructor(public sideMenuService: SideMenuService) {}

  ngOnInit(): void {
    const marginTop =
      this.menu.position === VerticalDisplayPosition.Bottom ? 'auto' : '0px';

    this.margin = `${marginTop} 0px 0px 0px`;
  }
}
