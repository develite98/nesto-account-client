import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPaginationResult, ThemeModel } from '@mix/mix.lib';
import { InputLabeledComponent } from '@mix/mix.ui';
import {
  TuiButtonModule,
  TuiDialogContext,
  TuiDialogService,
  TuiGroupModule,
  TuiLabelModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiPaginationModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

import { ThemeApiService } from '../../../services/api/theme-api.service';
import { ThemeImportComponent } from '../../theme-import/theme-import.component';

@Component({
  selector: 'mix-init-themes',
  templateUrl: './init-themes.component.html',
  styleUrls: ['./init-themes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ThemeImportComponent,
    TuiGroupModule,
    TuiButtonModule,
    InputLabeledComponent,
    TuiLabelModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiDataListWrapperModule,
    TuiPaginationModule
  ]
})
export class InitThemesComponent implements OnInit {
  @Output() public themeSubmit: EventEmitter<ThemeModel | null> =
    new EventEmitter();
  public currentSelectedTheme: ThemeModel | null = null;
  public availableThemes: IPaginationResult<ThemeModel> | undefined;
  public filterForm: FormGroup = new FormGroup({
    category: new FormControl(''),
    search: new FormControl('')
  });

  constructor(
    public themeApi: ThemeApiService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  public ngOnInit(): void {
    this.themeApi.getThemeStore().subscribe({
      next: (availableThemes: IPaginationResult<ThemeModel>) => {
        this.availableThemes = availableThemes;
      }
    });
  }

  public submitTheme(): void {
    this.themeSubmit.emit(this.currentSelectedTheme);
  }

  public showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content as any).subscribe();
  }

  public onThemeChoose(value: ThemeModel): void {
    this.currentSelectedTheme = value;
  }
}
