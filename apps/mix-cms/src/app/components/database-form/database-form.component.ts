import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  MixDatabaseColumnModel,
  MixDatabaseModel,
  MixDataType
} from '@mix/mix.lib';
import {
  BaseComponent,
  DatabaseApiService,
  FormUtils,
  StringUtils
} from '@mix/mix.share';
import { EmptyContentComponent } from '@mix/mix.ui';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiTabsModule
} from '@taiga-ui/kit';

import { EntityEditorComponent } from './entity-editor/entity-editor.component';

@Component({
  selector: 'mix-database-form',
  templateUrl: './database-form.component.html',
  styleUrls: ['./database-form.component.scss'],
  imports: [
    CommonModule,
    EntityEditorComponent,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiLinkModule,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    TuiButtonModule,
    EmptyContentComponent,
    TuiTabsModule,
    TuiSvgModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class DatabaseFormComponent extends BaseComponent implements OnInit {
  @Input() public mode: 'Create' | 'Edit' = 'Create';
  @Input() public databaseModel: MixDatabaseModel | undefined = undefined;

  public activeTabIndex = 0;
  public form = new FormGroup({
    displayName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    systemName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    columns: new FormArray([])
  });

  public get columns(): FormArray<FormGroup> {
    return this.form.controls['columns'] as unknown as FormArray;
  }

  constructor(public databaseApi: DatabaseApiService) {
    super();

    this.form.controls.displayName.valueChanges.subscribe(v => {
      this.form.controls.systemName.patchValue(StringUtils.textToSystemName(v));
    });
  }

  public ngOnInit(): void {
    if (this.databaseModel) {
      this.form.controls.displayName.patchValue(
        this.databaseModel.displayName ?? ''
      );

      this.form.controls.systemName.patchValue(
        this.databaseModel.systemName ?? ''
      );

      this.databaseModel.columns?.forEach(c => {
        this.addColumn(c);
      });
    }
  }

  public addColumn(column?: MixDatabaseColumnModel): void {
    const columnForm: FormGroup = new FormGroup({
      id: new FormControl(column?.id ?? ''),
      displayName: new FormControl(
        column?.displayName ?? '',
        Validators.required
      ),
      systemName: new FormControl(
        column?.systemName ?? '',
        Validators.required
      ),
      dataType: new FormControl(
        column?.dataType ?? MixDataType.CusTom,
        Validators.required
      ),
      defaultValue: new FormControl(''),
      columnConfigurations: new FormGroup({
        maxLength: new FormControl(null),
        isRequire: new FormControl(
          column?.columnConfigurations.isEncrypt ?? false,
          Validators.required
        ),
        isRegex: new FormControl(
          column?.columnConfigurations.isRegex ?? false,
          Validators.required
        ),
        isEncrypt: new FormControl(
          column?.columnConfigurations.isEncrypt ?? false,
          Validators.required
        ),
        isSelect: new FormControl(
          column?.columnConfigurations.isSelect ?? false,
          Validators.required
        ),
        isUnique: new FormControl(
          column?.columnConfigurations.isUnique ?? false,
          Validators.required
        ),
        isValid: new FormControl(
          column?.columnConfigurations.isValid ?? false,
          Validators.required
        )
      })
    });

    (this.form.controls['columns'] as unknown as FormArray).push(columnForm);
  }

  public removeColumn(index: number): void {
    (this.form.controls['columns'] as unknown as FormArray).removeAt(index);
  }

  public submit(): MixDatabaseModel | undefined {
    if (FormUtils.validateForm(this.form)) {
      if (!this.databaseModel) return;

      const database: MixDatabaseModel = {
        ...this.databaseModel,
        systemName: this.form.value.systemName,
        displayName: this.form.value.displayName,
        columns: this.form.value.columns
      };

      return database;
    }

    return undefined;
  }
}
