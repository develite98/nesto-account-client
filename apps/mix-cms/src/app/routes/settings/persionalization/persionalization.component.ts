import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MixUiTheme, UiThemeController } from '@mix/mix.share';
import {
  defaultEditorColors,
  TuiColorPickerModule,
  TuiInputColorModule
} from '@taiga-ui/addon-editor';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'mix-persionalization',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiAccordionModule,
    TuiColorPickerModule,
    TuiInputColorModule,
    TablerIconsModule,
    FormsModule,
    TuiButtonModule
  ],
  templateUrl: './persionalization.component.html',
  styleUrls: ['./persionalization.component.scss']
})
export class PersionalizationComponent implements OnInit {
  public readonly palette = defaultEditorColors;
  public isEditing = false;
  public editingTheme!: MixUiTheme;
  public originalEditingTheme!: MixUiTheme;

  constructor(public uiThemeControl: UiThemeController) {}

  ngOnInit(): void {
    this.editingTheme = Object.assign({}, this.uiThemeControl.currentTheme);
    this.originalEditingTheme = Object.assign(
      {},
      this.uiThemeControl.currentTheme
    );
  }

  public get menuBg(): string | undefined {
    return this.editingTheme['--mix-side-menu-bg'];
  }

  public get mainBg(): string | undefined {
    return this.editingTheme['--mix-body-background'];
  }

  public get mainWorkspaceBg(): string | undefined {
    return this.editingTheme['--mix-main-workspace-background'];
  }

  public get subWorkspaceBg(): string | undefined {
    return this.editingTheme['--mix-sub-workspace-background'];
  }

  public bgSelectedChange(theme: MixUiTheme): void {
    this.editingTheme = Object.assign({}, theme);
    this.originalEditingTheme = Object.assign({}, theme);
    this.uiThemeControl.initTheme(theme);
  }

  public applyTheme(): void {
    this.uiThemeControl.initTheme(this.editingTheme);
    this.originalEditingTheme = Object.assign({}, this.editingTheme);
    this.isEditing = false;
  }
}
