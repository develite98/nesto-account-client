import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiHostedDropdownModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-emoji-picker',
  standalone: true,
  imports: [
    CommonModule,
    TuiHostedDropdownModule,
    TuiButtonModule,
    TuiActiveZoneModule
  ],
  templateUrl: './emoji-picker.component.html',
  styleUrls: ['./emoji-picker.component.scss']
})
export class EmojiPickerComponent {
  @Output() public emojiSelect: EventEmitter<string> = new EventEmitter();
  readonly smiles = [
    `ð`,
    `ðĨ°`,
    `ð`,
    `ðĪĐ`,
    `ð`,
    `ð`,
    `ð`,
    `ð`,
    `ðĪŠ`,
    `ð`,
    `ðĪ`
  ];

  public insertSmile(smile: string): void {
    this.emojiSelect.emit(smile);
  }
}
