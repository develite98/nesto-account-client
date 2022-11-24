import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MixPagePortalModel, MixTemplateModel } from '@mix/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DestroyService,
  FormUtils,
  MixPageApiService,
  MixTemplateApiService,
  PageModuleSelectedComponent,
  TemplateEditorComponent
} from '@mix/mix.share';
import {
  CodeEditorComponent,
  InputLabeledComponent,
  RichTextEditorComponent,
  SkeletonLoadingComponent
} from '@mix/mix.ui';
import {
  TuiLabelModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiSelectModule,
  TuiTabsModule
} from '@taiga-ui/kit';

@Component({
  selector: 'mix-page-detail',
  templateUrl: './page-detail.component.html',
  styleUrls: ['./page-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SkeletonLoadingComponent,
    ContentDetailContainerComponent,
    TuiTabsModule,
    ReactiveFormsModule,
    InputLabeledComponent,
    RichTextEditorComponent,
    CodeEditorComponent,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiSvgModule,
    TemplateEditorComponent,
    TuiSelectModule,
    TuiTextfieldControllerModule,
    FormsModule,
    TuiLabelModule,
    PageModuleSelectedComponent
  ],
  providers: [DestroyService]
})
export class PageDetailComponent extends BaseComponent implements OnInit {
  public activeTabIndex = 0;
  public page: MixPagePortalModel | undefined = undefined;
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    excerpt: [''],
    content: [''],
    seoTitle: [''],
    seoName: [''],
    seoDescription: [''],
    seoKeywords: [''],
    seoSource: ['']
  });
  public availableTemplates: MixTemplateModel[] = [];
  public selectedTemplate: MixTemplateModel | undefined = undefined;

  constructor(
    public activatedRoute: ActivatedRoute,
    private pageApi: MixPageApiService,
    private templateApi: MixTemplateApiService,
    private fb: FormBuilder,
    private destroy: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.pageApi.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: result => {
        this.page = result;
        this.form = this.fb.group({
          title: [result.title, [Validators.required]],
          excerpt: [result.excerpt],
          content: [result.content],
          seoTitle: [result.seoTitle],
          seoName: [result.seoName],
          seoDescription: [result.seoDescription],
          seoKeywords: [result.seoKeywords],
          seoSource: [result.seoSource]
        });

        this.loadTemplate();
        this.loading$.next(false);
      },
      error: () => {
        this.error$.next(true);
      }
    });
  }

  public loadTemplate(): void {
    if (!this.page || !this.page.template) return;

    this.templateApi
      .gets({
        themeId: this.page.template?.mixThemeId,
        folderType: this.page.template.folderType,
        columns: 'id, fileName',
        pageSize: 1000
      })
      .subscribe({
        next: result => {
          this.availableTemplates = result.items;
          this.selectedTemplate = result.items.find(
            i => i.id == this.page?.templateId
          );
        }
      });
  }

  public savePage(): void {
    if (!this.form || !this.page || !FormUtils.validateForm(this.form)) return;

    this.pageApi
      .save({
        ...this.page,
        ...this.form.getRawValue()
      })
      .pipe(this.toastLoadingState())
      .subscribe();
  }

  public pageTemplateChange(template: MixTemplateModel): void {
    if (this.page) this.page.templateId = template.id;
  }
}
