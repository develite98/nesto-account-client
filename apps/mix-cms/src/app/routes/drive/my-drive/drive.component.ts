import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Injector,
  ViewChild
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MixFile } from '@mix/mix.lib';
import {
  FileCardComponent,
  FileIndicatorComponent,
  MixFileApiService
} from '@mix/mix.share';
import { EmptyContentComponent } from '@mix/mix.ui';
import { TuiItemModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogService,
  TuiGroupModule,
  TuiHostedDropdownModule,
  TuiLinkModule
} from '@taiga-ui/core';
import {
  TuiBreadcrumbsModule,
  TuiFileLike,
  TuiInputFilesComponent,
  TuiInputFilesModule,
  TuiRadioBlockModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'mix-drive',
  standalone: true,
  imports: [
    CommonModule,
    TuiGroupModule,
    TuiRadioBlockModule,
    ReactiveFormsModule,
    TablerIconsModule,
    EmptyContentComponent,
    TuiBreadcrumbsModule,
    TuiItemModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    TuiButtonModule,
    TuiLinkModule,
    TuiInputFilesModule,
    FileIndicatorComponent,
    FormsModule,
    FileCardComponent
  ],
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriveComponent {
  @ViewChild(TuiInputFilesComponent, { static: true })
  filesComponent!: TuiInputFilesComponent;

  public open = false;
  public currentFolder = 'MixContent';
  public currentDirectories: string[] = [];
  public currentFiles: MixFile[] = [];
  public items: string[] = [];
  public readonly fileControl = new FormControl();
  public readonly loadingFiles$ = new Subject<TuiFileLike[] | null>();
  public loadingFiles: TuiFileLike[] = [];
  public readonly fileReload$ = new Subject<void>();

  public driveSettingForm = new FormGroup({
    mode: new FormControl('grid')
  });

  constructor(
    private fileApiService: MixFileApiService,
    private cdr: ChangeDetectorRef,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    private activeRouter: ActivatedRoute
  ) {
    this.processRoute();
    this.loadDrive();
    this.fileControl.valueChanges.subscribe((value: TuiFileLike[]) => {
      this.loadingFiles = value;
      this.loadingFiles$.next(this.loadingFiles);
      this.cdr.detectChanges();
    });

    this.fileReload$.pipe(debounceTime(500)).subscribe(() => {
      this.loadDrive();
    });
  }

  public upload(): void {
    const event = new MouseEvent('click', { bubbles: true });
    this.filesComponent.nativeFocusableElement?.dispatchEvent(event);
  }

  public loadDrive(): void {
    this.fileApiService
      .getAssets({
        pageSize: 10,
        status: 'Published',
        folder: this.currentFolder,
        direction: 'Desc',
        orderBy: 'CreatedDateTime'
      })
      .subscribe(result => {
        this.currentDirectories = result.directories;
        this.currentFiles = result.files;
        this.cdr.detectChanges();
      });
  }

  public processRoute(): void {
    const param: string = this.activeRouter.snapshot.queryParams['folderName'];
    if (param) this.currentFolder = param;
    this.items = this.currentFolder.split('/');
  }

  public moveToFolder(name: string): void {
    this.currentFolder = `${this.currentFolder}/${name}`;
    this.items.push(name);
    this.loadDrive();
  }

  public breadcrumbsClick(index: number): void {
    this.items = this.items.slice(0, index + 1);
    this.currentFolder = this.items.join('/');
    this.loadDrive();
  }

  public removeUploadingFile(filed: TuiFileLike): void {
    this.loadingFiles = this.loadingFiles.filter(
      file => file.name !== filed.name
    );

    this.cdr.detectChanges();
  }
}
