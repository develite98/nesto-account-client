import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemeModel } from '@mix/mix.lib';
import {
  AppEvent,
  AppEventService,
  BaseComponent,
  FormUtils,
  MixFileInputComponent,
  PortalSidebarControlService,
  ShareModule,
  ThemeApiService,
  UploadApiService
} from '@mix/mix.share';
import { TuiAlertService } from '@taiga-ui/core';
import { TuiStepperModule } from '@taiga-ui/kit';
import { forkJoin, Observable, switchMap, tap } from 'rxjs';

@Component({
  selector: 'mix-cms-theme-import',
  templateUrl: './mix-theme-import.component.html',
  styleUrls: ['./mix-theme-import.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ShareModule, MixFileInputComponent, TuiStepperModule]
})
export class MixThemeImportComponent extends BaseComponent {
  public isSaving = false;
  public passCreateFolder = false;
  public passCreateTheme = false;

  public themeForm: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    previewUrl: new FormControl(''),
    isCloneFromCurrentTheme: new FormControl(true)
  });

  constructor(
    private themeApi: ThemeApiService,
    public appEvent: AppEventService,
    private sidebarControl: PortalSidebarControlService,
    private uploadApi: UploadApiService,
    private cdr: ChangeDetectorRef,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {
    super();
  }

  public onImportTheme(): void {
    if (!FormUtils.validateForm(this.themeForm)) {
      return;
    }

    this.isSaving = true;
    this.themeForm.disable();
    const newTheme: ThemeModel = this.themeForm.getRawValue();

    forkJoin([
      this.createEntryAssetsFolder(newTheme).pipe(
        tap(() => {
          this.passCreateFolder = true;
          this.cdr.detectChanges();
        })
      ),
      this.themeApi.getDefault().pipe(
        switchMap(defaultTheme =>
          this.themeApi.save({
            ...defaultTheme,
            ...newTheme
          })
        ),
        tap(() => {
          this.passCreateTheme = true;
          this.cdr.detectChanges();
        })
      )
    ]).subscribe(() => {
      this.toast.success('Success create your new theme');
      setTimeout(() => {
        this.appEvent.event$.next({ type: AppEvent.Refresh });
        this.sidebarControl.hide();
      }, 3000);
    });
  }

  public createEntryAssetsFolder(newTheme: ThemeModel): Observable<string> {
    const title = newTheme.displayName.split(' ').join('');
    const entryFile = new File(['title'], 'readme.md', { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', entryFile);
    formData.append('folder', `MixContent/StaticFiles/${title}`);

    return this.uploadApi.uploadFile(formData);
  }
}
