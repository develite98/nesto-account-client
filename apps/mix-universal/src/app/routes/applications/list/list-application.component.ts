import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaginationRequestModel } from '@mix/mix.lib';
import { ApplicationApiService, MixDataTableModule } from '@mix/mix.share';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { TablerIconsModule } from 'angular-tabler-icons';

@Component({
  selector: 'mix-universe-list-application',
  templateUrl: './list-application.component.html',
  styleUrls: ['./list-application.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MixDataTableModule,
    TuiButtonModule,
    TuiLinkModule,
    RouterModule,
    TablerIconsModule
  ]
})
export class ListApplicationComponent {
  constructor(public applicationApi: ApplicationApiService) {}

  public fetchDataFn = (request: PaginationRequestModel) =>
    this.applicationApi.gets(request);
}
