import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { TuiErrorModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-formly-input',
  standalone: true,
  imports: [
    CommonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    FormlyModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule
  ],
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormInputComponent extends FieldType<FieldTypeConfig> {
}
