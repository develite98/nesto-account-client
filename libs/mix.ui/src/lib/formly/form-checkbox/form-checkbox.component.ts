import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { TuiErrorModule } from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiFieldErrorPipeModule
} from '@taiga-ui/kit';

@Component({
  selector: 'mix-formly-checkbox',
  standalone: true,
  imports: [
    CommonModule,
    TuiCheckboxLabeledModule,
    ReactiveFormsModule,
    FormlyModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent extends FieldType<FieldTypeConfig> {}
