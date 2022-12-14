import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  MixPostPortalModel,
  MixPostReferenceModel,
  MixTemplateModel
} from '@mix/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DestroyService,
  FormUtils,
  MixPostApiService,
  MixTemplateApiService,
  PostNavSelectedComponent,
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
import { takeUntil } from 'rxjs';

@Component({
  selector: 'mix-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SkeletonLoadingComponent,
    ContentDetailContainerComponent,
    TuiTabsModule,
    ReactiveFormsModule,
    InputLabeledComponent,
    RichTextEditorComponent,
    PostNavSelectedComponent,
    CodeEditorComponent,
    TuiSelectModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TemplateEditorComponent,
    TuiLabelModule,
    TuiSvgModule
  ],
  providers: [DestroyService]
})
export class PostDetailComponent extends BaseComponent implements OnInit {
  public selectedPostNavs: MixPostReferenceModel[] = [];
  public activeTabIndex = 0;
  public post: MixPostPortalModel | undefined = undefined;
  public form: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    excerpt: ['', [Validators.required]],
    content: ['', [Validators.required]],
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
    private postApi: MixPostApiService,
    private templateApi: MixTemplateApiService,
    private fb: FormBuilder,
    private destroy: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.postApi.getById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: result => {
        this.post = result;
        this.selectedPostNavs = result.postNavs ?? [];
        this.form = this.fb.group({
          title: [result.title, [Validators.required]],
          excerpt: [result.excerpt, [Validators.required]],
          content: [result.content, [Validators.required]],
          seoTitle: [result.seoTitle],
          seoName: [result.seoName],
          seoDescription: [result.seoDescription],
          seoKeywords: [result.seoKeywords],
          seoSource: [result.seoSource]
        });

        this.registerTitleChange();
        this.loadTemplate();
        this.loading$.next(false);
      },
      error: () => {
        this.error$.next(true);
      }
    });
  }

  public loadTemplate(): void {
    if (!this.post || !this.post.template) return;

    this.templateApi
      .gets({
        themeId: this.post.template?.mixThemeId,
        folderType: this.post.template.folderType,
        columns: 'id, fileName',
        pageSize: 1000
      })
      .subscribe({
        next: result => {
          this.availableTemplates = result.items;
          this.selectedTemplate = result.items.find(
            i => i.id == this.post?.templateId
          );
        }
      });
  }

  public registerTitleChange(): void {
    this.header.setTitle(this.form.value.title);
    this.form.controls['title'].valueChanges
      .pipe(takeUntil(this.destroy))
      .subscribe(t => this.header.setTitle(t));
    this.destroy.subscribe(() => this.header.hideTitle());
  }

  public savePost(): void {
    if (!this.form || !this.post) return;
    if (!FormUtils.validateForm(this.form)) return;

    const post: MixPostPortalModel = {
      ...this.post,
      ...this.form.getRawValue()
    };

    this.disabled$.next(true);
    this.postApi
      .save(post)
      .pipe(this.toastLoadingState())
      .subscribe({
        next: () => {
          this.disabled$.next(false);
        },
        error: () => {
          this.disabled$.next(false);
        }
      });
  }

  public postTemplateChange(template: MixTemplateModel): void {
    if (this.post) this.post.templateId = template.id;
  }
}
