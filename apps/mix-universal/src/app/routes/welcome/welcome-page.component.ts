import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputLabeledComponent } from '@mix/mix.ui';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputLabeledComponent,
    TuiInputModule,
    TuiButtonModule
  ]
})
export class WelcomePageComponent {}
