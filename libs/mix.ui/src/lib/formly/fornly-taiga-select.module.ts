import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { FormSelectComponent } from './form-select/form-select.component';

@NgModule({
  imports: [
    FormlyModule.forChild({
      types: [
        {
          name: 'select',
          component: FormSelectComponent
        }
      ]
    })
  ]
})
export class FormlyTaigaSelectModule {}
