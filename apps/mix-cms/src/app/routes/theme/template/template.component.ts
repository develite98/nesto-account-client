import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MixTemplateFolder, MixTemplateModel, ThemeModel } from '@mix/mix.lib';
import {
  BaseComponent,
  FormUtils,
  MixFolderFileComponent,
  MixTemplateApiService,
  MixToolbarComponent,
  ThemeApiService
} from '@mix/mix.share';
import { FormFieldConfig, FormlyTaigaInputModule } from '@mix/mix.ui';
import { FormlyModule } from '@ngx-formly/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiTabsModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-template',
  standalone: true,
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  imports: [
    CommonModule,
    MixToolbarComponent,
    MixFolderFileComponent,
    TuiTabsModule,
    TuiButtonModule,
    TuiSvgModule,
    FormlyModule,
    FormlyTaigaInputModule,
    ReactiveFormsModule
  ]
})
export class TemplateComponent extends BaseComponent {
  public activeTabIndex = 0;
  public themeId = 1;
  public FOLDER = MixTemplateFolder;
  public themeModel!: ThemeModel;
  public themeForm: FormGroup = new FormGroup({});
  public themeFields: FormFieldConfig[] = [
    {
      key: 'displayName',
      type: 'input',
      props: {
        required: true,
        label: 'Display name',
        placeholder: 'Enter your theme name'
      }
    },
    {
      key: 'systemName',
      type: 'input',
      props: {
        required: true,
        label: 'System name',
        placeholder: 'Enter your theme system name'
      }
    }
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    public templateApi: MixTemplateApiService,
    public themeApi: ThemeApiService
  ) {
    super();
    this.themeId = this.activatedRoute.snapshot?.params['themeId'];
    if (this.themeId) {
      this.themeApi.getById(this.themeId).subscribe({
        next: result => {
          this.themeModel = result;
        }
      });
    }
  }

  public templateClick(template: MixTemplateModel): void {
    this.route.navigateByUrl(`theme/${this.themeId}/template/${template.id}`);
  }

  public saveTheme(): void {
    if (FormUtils.validateForm(this.themeForm)) {
      this.themeApi
        .save(this.themeModel)
        .pipe(this.toastLoadingState())
        .subscribe();
    }
  }
}
