import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputLabeledComponent } from '@mix/mix.ui';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-global-filter',
  templateUrl: './global-filter.component.html',
  styleUrls: ['./global-filter.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputLabeledComponent,
    TuiInputDateRangeModule
  ]
})
export class MixGlobalFilterComponent {
  public filterForm: FormGroup = new FormGroup({
    type: new FormControl(''),
    fromTo: new FormControl(
      new TuiDayRange(new TuiDay(2018, 2, 10), new TuiDay(2018, 3, 20))
    )
  });

  public ngOnInit(): void {
    console.log('filter init');
  }
}
