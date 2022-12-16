import { Component, Input } from '@angular/core';

@Component({
  selector: 'mix-money-display',
  templateUrl: './money-display.component.html',
  styleUrls: ['./money-display.component.scss']
})
export class MoneyDisplayComponent {
  @Input() public value = 0;
  @Input() public textSize = 16;
  @Input() public currencySize = 12;
}
