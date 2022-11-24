import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { FormCheckboxComponent } from './form-checkbox/form-checkbox.component';

@NgModule({
  imports: [
    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          component: FormCheckboxComponent
        }
      ]
    })
  ]
})
export class FormlyTaigaCheckboxModule {}
