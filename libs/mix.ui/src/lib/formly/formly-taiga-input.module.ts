import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';

import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  imports: [
    FormlyModule.forChild({
      types: [
        {
          name: 'input',
          component: FormInputComponent
        },
        { name: 'string', extends: 'input' },
        {
          name: 'number',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'number'
            }
          }
        },
        {
          name: 'integer',
          extends: 'input',
          defaultOptions: {
            props: {
              type: 'number'
            }
          }
        }
      ]
    })
  ]
})
export class FormlyTaigaInputModule {}
