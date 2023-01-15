import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'mix-input-number',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent {
  @Input() public disabled = false;
  @Input() public value = 1;
  @Output() public valueChange: EventEmitter<number> = new EventEmitter();

  public get getDisplay(): string {
    return this.value >= 10 ? this.value.toString() : '0' + this.value;
  }

  public increase(): void {
    this.value = Number.parseInt(this.value.toString());
    this.value += 1;
    this.valueChange.emit(this.value);
  }

  public decrease(): void {
    this.value = Number.parseInt(this.value.toString());
    if (this.value <= 1) return;
    this.value -= 1;
    this.valueChange.emit(this.value);
  }
}
