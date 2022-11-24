import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiHintModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { IconsModule } from '../../../icons.module';
import { IMessage } from '../messenger/messenger.component';

@Component({
  selector: 'mix-messenger-message',
  standalone: true,
  imports: [
    CommonModule,
    IconsModule,
    TablerIconsModule,
    TuiAvatarModule,
    TuiHintModule
  ],
  templateUrl: './messenger-message.component.html',
  styleUrls: ['./messenger-message.component.scss']
})
export class MessengerMessageComponent {
  @Input() public fromAnother = false;
  @Input() public message: IMessage | undefined = undefined;
}
