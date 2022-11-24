import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import {
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiSelectModule
} from '@taiga-ui/kit';

@Component({
  selector: 'mix-formly-select',
  standalone: true,
  imports: [
    CommonModule,
    TuiSelectModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    FormlyModule,
    FormlySelectModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiDataListWrapperModule
  ],
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormSelectComponent extends FieldType<FieldTypeConfig> {}
