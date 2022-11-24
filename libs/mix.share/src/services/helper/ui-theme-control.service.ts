import { Injectable } from '@angular/core';

export interface MixUiTheme {
  '--mix-side-menu-bg'?: string;
  '--mix-side-menu-text-color'?: string;
  '--mix-main-workspace-background'?: string;
  '--mix-sub-workspace-background'?: string;
  '--mix-body-background'?: string;
}

@Injectable({ providedIn: 'root' })
export class UiThemeController {
  public currentTheme!: MixUiTheme;
  public defaultTheme: MixUiTheme = {
    '--mix-side-menu-bg': 'rgba(15, 146, 243, 0.05)',
    '--mix-side-menu-text-color': '#000',
    '--mix-main-workspace-background': '#fff',
    '--mix-sub-workspace-background': ' #fff',
    '--mix-body-background': '#f3f9fe'
  };

  public purpleTheme: MixUiTheme = {
    '--mix-side-menu-bg': 'rgba(255, 255, 255, 0.161)',
    '--mix-side-menu-text-color': '#fff',
    '--mix-main-workspace-background': 'rgba(255, 255, 255, 0.8)',
    '--mix-sub-workspace-background': 'rgba(255, 255, 255, 0.8)',
    '--mix-body-background': '#3a258d'
  };

  public aquaTheme: MixUiTheme = {
    '--mix-side-menu-bg': 'rgba(255, 255, 255, 0.161)',
    '--mix-side-menu-text-color': '#fff',
    '--mix-main-workspace-background': 'rgba(255, 255, 255, 0.8)',
    '--mix-sub-workspace-background': 'rgba(255, 255, 255, 0.8)',
    '--mix-body-background': '#B2D5EE'
  };

  public initTheme(theme: MixUiTheme): void {
    Object.keys(theme).forEach(key => {
      (
        document.getElementsByTagName('mix-cms-root')[0] as HTMLElement
      ).style.setProperty(key, (theme as any)[key]);
    });

    this.currentTheme = theme;
  }
}
