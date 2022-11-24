import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';

type MixMode = 'local' | 'universal';

@Component({
  selector: 'mix-init-mode',
  templateUrl: './init-mode.component.html',
  styleUrls: ['./init-mode.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule, TuiLinkModule]
})
export class InitModeComponent {
  @Output() public modeSubmit: EventEmitter<MixMode> = new EventEmitter();

  public mode: MixMode = 'local';

  public changeMode(mode: MixMode): void {
    this.mode = mode;
  }

  public submitMode(): void {
    this.modeSubmit.emit(this.mode);
  }
}
