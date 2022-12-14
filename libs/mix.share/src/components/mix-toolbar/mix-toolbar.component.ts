import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TuiHintModule } from '@taiga-ui/core';

import { ShareModule } from '../../share.module';

@Component({
  selector: 'mix-toolbar',
  templateUrl: './mix-toolbar.component.html',
  styleUrls: ['./mix-toolbar.component.scss'],
  standalone: true,
  imports: [ShareModule, TuiHintModule]
})
export class MixToolbarComponent<T> {
  @Input() public selectedItem: T[] = [];
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();

  public onDelete(): void {
    this.delete.emit();
  }
}
