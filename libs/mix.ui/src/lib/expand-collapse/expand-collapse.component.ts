import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TuiSvgModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-expand-collapse',
  templateUrl: './expand-collapse.component.html',
  styleUrls: ['./expand-collapse.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiSvgModule]
})
export class ExpandCollapseComponent {
  @Input() public title = 'Title';
  @Input() public isExpand = true;
}
