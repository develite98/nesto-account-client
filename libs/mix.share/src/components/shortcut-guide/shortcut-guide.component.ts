import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mix-share-shortcut-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shortcut-guide.component.html',
  styleUrls: ['./shortcut-guide.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShortcutGuideComponent {
  public globalShortcuts: { label: string; key: string }[] = [
    {
      label: 'Show shortcut guideline',
      key: 'F1'
    },
    {
      label: 'Universal Search',
      key: 'F2'
    },
    {
      label: 'Create new POST',
      key: 'F3'
    }
  ];
}
