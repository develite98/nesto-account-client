import { Component, TemplateRef, ViewChild } from '@angular/core';
import { PaginationRequestModel, ThemeModel } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  BaseComponent,
  DestroyService,
  MixDataTableModule,
  MixGlobalFilterComponent,
  MixStatusIndicatorComponent,
  PortalSidebarControlService,
  ShareModule,
  SidebarContainerComponent,
  ThemeApiService
} from '@mix/mix.share';

import { MixThemeImportComponent } from '../../../components/mix-theme-import/mix-theme-import.component';

@Component({
  selector: 'mix-list-theme',
  templateUrl: './list-theme.component.html',
  styleUrls: ['./list-theme.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    MixThemeImportComponent,
    SidebarContainerComponent,
    MixStatusIndicatorComponent,
    MixGlobalFilterComponent
  ],
  providers: [DestroyService]
})
export class ListThemeComponent extends BaseComponent {
  @ViewChild('importTheme') public importTemp!: TemplateRef<HTMLElement>;

  public fetchDataFn = (filter: PaginationRequestModel) =>
    this.themeApi.gets(filter);
  public deleteDataFn = (data: ThemeModel) => this.themeApi.remove(data.id);

  constructor(
    private themeApi: ThemeApiService,
    private appEvent: AppEventService,
    private sidebarControl: PortalSidebarControlService
  ) {
    super();
  }

  public themeClick(theme: ThemeModel): void {
    this.appEvent.notify({
      type: AppEvent.ThemeSelected,
      data: { id: theme.id, title: theme.displayName }
    });
  }

  public onImportThemeClick(): void {
    this.sidebarControl.show(this.importTemp);
  }

  public viewTemplate(themeId: number): void {
    this.route.navigateByUrl(`theme/${themeId}/template`);
  }

  public viewAssests(themeName: string): void {
    this.route.navigateByUrl(
      `drive/app-drive?folderName=MixContent/StaticFiles/${themeName
        .split(' ')
        .join('')}`
    );
  }
}
