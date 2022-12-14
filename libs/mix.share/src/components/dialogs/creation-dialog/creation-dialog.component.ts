import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MixModulePortalModel,
  MixPagePortalModel,
  MixPostPortalModel
} from '@mix/mix.lib';
import { switchMap } from 'rxjs';

import { slideAnimation } from '../../../animations';
import { BaseComponent } from '../../../bases/base-component.component';
import {
  MixPageApiService,
  MixPostApiService,
  PortalSidebarControlService
} from '../../../services';
import { MixModuleApiService } from '../../../services/api/mix-module-api.service';
import { ShareModule } from '../../../share.module';
import { FormUtils, StringUtils } from '../../../utils';
import { MixModuleSelectComponent } from '../../module-selects-list/module-select.component';

export type MixCreationType = 'Post' | 'Page' | 'Module';

@Component({
  selector: 'mix-creation-dialog',
  templateUrl: './creation-dialog.component.html',
  styleUrls: ['./creation-dialog.component.scss'],
  standalone: true,
  imports: [ShareModule, MixModuleSelectComponent],
  animations: [slideAnimation]
})
export class CreationDialogComponent extends BaseComponent implements OnInit {
  @Input() public type: MixCreationType = 'Post';

  public items: MixCreationType[] = ['Post', 'Page', 'Module'];
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    systemName: new FormControl('', Validators.required),
    excerpt: new FormControl(''),
    description: new FormControl(''),
    seoName: new FormControl(''),
    seoTitle: new FormControl(''),
    seoDescription: new FormControl(''),
    seoKeywords: new FormControl(''),
    seoSource: new FormControl(''),
    specificulture: new FormControl('en-Us')
  });

  public goToPostAfterCreate = true;
  public closeDialogAfterCreate = true;
  public initialize = false;
  public activeTabIndex = 0;
  public showRightSideMenu = true;
  public largeMode = false;
  public get canShowRelatedModule(): boolean {
    return this.type === 'Page' || this.type === 'Post';
  }
  public get canShowSEOConfig(): boolean {
    return this.type === 'Page' || this.type === 'Post';
  }

  constructor(
    public postApi: MixPostApiService,
    public moduleApi: MixModuleApiService,
    public pageApi: MixPageApiService,
    @Inject(PortalSidebarControlService)
    private readonly sidebarControl: PortalSidebarControlService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form.controls['title'].valueChanges.subscribe((title: string) => {
      this.form.controls['systemName'].patchValue(
        StringUtils.textToSystemName(title)
      );
    });
  }

  public submitForm(): void {
    if (!FormUtils.validateForm(this.form)) return;

    switch (this.type) {
      case 'Post':
        this.createNewPost();
        break;
      case 'Module':
        this.createNewModule();
        break;
      case 'Page':
        this.createNewPage();
        break;
    }
  }

  public createNewPost(): void {
    const form = this.form.getRawValue();
    this.handleBeforeCreate();
    this.postApi
      .getDefault()
      .pipe(
        switchMap(result => {
          const post = <MixPostPortalModel>{
            ...result,
            title: form['title'],
            excerpt: form['excerpt'],
            content: form['description'],
            specificulture: form['specificulture']
          };

          return this.postApi.save(post);
        })
      )
      .pipe(this.toastLoadingState())
      .subscribe(() => {
        this.handleAfterCreate();
      });
  }

  public createNewModule(): void {
    const form = this.form.getRawValue();
    this.handleBeforeCreate();
    this.moduleApi
      .getDefault()
      .pipe(
        switchMap(result => {
          const module = <MixModulePortalModel>{
            ...result,
            title: form['title'],
            excerpt: form['excerpt'],
            content: form['description'],
            systemName: form['systemName'],
            specificulture: form['specificulture']
          };

          return this.moduleApi.save(module);
        })
      )
      .pipe(this.toastLoadingState())
      .subscribe(() => {
        this.handleAfterCreate();
      });
  }

  public createNewPage(): void {
    const form = this.form.getRawValue();
    this.handleBeforeCreate();
    this.pageApi
      .getDefault()
      .pipe(
        switchMap(result => {
          const page = <MixPagePortalModel>{
            ...result,
            title: form['title'],
            excerpt: form['excerpt'],
            content: form['description'],
            systemName: form['systemName'],
            seoDescription: form['seoDescription'],
            seoKeywords: form['seoKeywords'],
            seoName: form['seoName'],
            seoTitle: form['seoTitle'],
            seoSource: form['seoSource'],
            specificulture: form['specificulture']
          };

          return this.pageApi.save(page);
        })
      )
      .pipe(this.toastLoadingState())
      .subscribe(() => {
        this.handleAfterCreate();
      });
  }

  public handleBeforeCreate(): void {
    this.form.disable();
    this.loading = true;
  }

  public handleAfterCreate(): void {
    this.loading = false;
    this.form.enable();
  }

  public closeSidebar(): void {
    this.sidebarControl.hide();
  }

  public toggleLargeMode(): void {
    this.largeMode = !this.largeMode;
  }
}
