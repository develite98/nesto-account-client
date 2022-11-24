import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IGetTemplatesRequest,
  MixTemplateFolder,
  MixTemplateModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { EmptyContentComponent } from '@mix/mix.ui';
import { TuiAutoFocusModule } from '@taiga-ui/cdk';
import { TuiAccordionModule, TuiCheckboxModule } from '@taiga-ui/kit';
import { BehaviorSubject, forkJoin, switchMap } from 'rxjs';

import { BaseComponent } from '../../../bases';
import { MixTemplateApiService } from '../../../services';
import { ShareModule } from '../../../share.module';
import { FormUtils } from '../../../utils';

@Component({
  selector: 'mix-template-folder',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ShareModule,
    TuiAccordionModule,
    TuiAutoFocusModule,
    TuiCheckboxModule,
    EmptyContentComponent
  ]
})
export class MixFolderFileComponent extends BaseComponent implements OnInit {
  @Input() public showFileDate = true;
  @Input() public themeId = 1;
  @Input() public folderType: MixTemplateFolder = MixTemplateFolder.Masters;
  @Input() public open = false;
  @Input() public minimize = false;
  @Input() public selectedTemplateId: number | undefined = undefined;
  @Output() public templateClick: EventEmitter<MixTemplateModel> =
    new EventEmitter();

  public editing = false;
  public newFileName: FormControl = new FormControl('', Validators.required);
  public selectedFiles: MixTemplateModel[] = [];
  public result$ = new BehaviorSubject<PaginationResultModel<MixTemplateModel>>(
    {
      items: [],
      pagingData: { pageIndex: 0, pageSize: 10 }
    }
  );

  public defaultQuery$: BehaviorSubject<IGetTemplatesRequest> =
    new BehaviorSubject<IGetTemplatesRequest>({
      themeId: this.themeId,
      folderType: MixTemplateFolder.Layouts,
      pageIndex: 0,
      pageSize: 100
    });

  constructor(private templateApi: MixTemplateApiService) {
    super();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  public fileClick(template: MixTemplateModel): void {
    this.templateClick.emit(template);
  }

  public onFocusedChange(isFocus: boolean): void {
    if (!isFocus) this.editing = false;
  }

  public onEnter(): void {
    if (!FormUtils.validateForm(this.newFileName as unknown as FormGroup))
      return;

    this.templateApi
      .getDefault()
      .pipe(
        switchMap((defaultTemplate: MixTemplateModel) => {
          const request: MixTemplateModel = {
            ...defaultTemplate,
            mixThemeId: this.themeId,
            fileName: this.newFileName.value,
            folderType: this.folderType,
            extension: '.cshtml',
            fileFolder: ''
          };

          return this.templateApi.save(request);
        })
      )
      .pipe(this.toastLoadingState())
      .subscribe({
        next: () => {
          this.editing = false;
          this.loadData();
        }
      });
  }

  public loadData(): void {
    this.loading$.next(true);
    const query = {
      ...this.defaultQuery$.value,
      themeId: this.themeId,
      folderType: this.folderType
    };

    this.templateApi.gets(query).subscribe({
      next: result => {
        this.loading$.next(false);
        this.result$.next(result);
      }
    });
  }

  public onFileSelect(isCheck: boolean, item: MixTemplateModel): void {
    if (isCheck) {
      this.selectedFiles.push(item);
    } else {
      this.selectedFiles = this.selectedFiles.filter(v => v.id !== item.id);
    }
  }

  public isFileSelected(item: MixTemplateModel): boolean {
    return this.selectedFiles.findIndex(v => v.id === item.id) >= 0;
  }

  public deleteFile(): void {
    this.modal
      .confirm(
        'Are you sure to delete this file ? Your data may not be reverted'
      )
      .subscribe(ok => {
        if (ok) {
          const requests = this.selectedFiles.map(file =>
            this.templateApi.remove(file.id)
          );

          forkJoin(requests)
            .pipe(this.toastLoadingState())
            .subscribe(() => {
              this.loadData();
              this.selectedFiles = [];
            });
        }
      });
  }
}
