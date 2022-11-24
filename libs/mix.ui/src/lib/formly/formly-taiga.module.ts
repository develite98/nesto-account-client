import { NgModule } from '@angular/core';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';

import { FormlyTaigaCheckboxModule } from './formly-taiga-checkbox.module';
import { FormlyTaigaInputModule } from './formly-taiga-input.module';
import { FormlyTaigaSelectModule } from './fornly-taiga-select.module';

@NgModule({
  imports: [
    FormlyModule,
    FormlyTaigaInputModule,
    FormlyTaigaCheckboxModule,
    FormlyTaigaSelectModule
  ],
  exports: [
    FormlyModule,
    FormlyTaigaInputModule,
    FormlyTaigaCheckboxModule,
    FormlyTaigaSelectModule
  ]
})
export class FormlyTaigaModule {}

export type FormFieldConfig = FormlyFieldConfig;
