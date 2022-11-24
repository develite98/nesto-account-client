import { Component } from '@angular/core';
import {
  IFilter,
  MixContentStatus,
  PaginationRequestModel
} from '@mix/mix.lib';
import {
  BaseComponent,
  DatabaseApiService,
  DestroyService,
  MixDataTableModule,
  MixGlobalFilterComponent,
  MixStatusIndicatorComponent,
  ShareModule,
  SidebarContainerComponent
} from '@mix/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';

import { RouteConfig } from '../../route.const';

@Component({
  selector: 'mix-list-database',
  templateUrl: './list-database.component.html',
  styleUrls: ['./list-database.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    SidebarContainerComponent,
    MixStatusIndicatorComponent,
    MixGlobalFilterComponent,
    TuiButtonModule
  ],
  providers: [DestroyService]
})
export class ListDatabaseComponent extends BaseComponent {
  public filters: IFilter[] = [
    {
      title: 'Status',
      options: [
        {
          label: 'Published',
          value: MixContentStatus.Published
        },
        {
          label: 'Draft',
          value: MixContentStatus.Draft
        },
        {
          label: 'Deleted',
          value: MixContentStatus.Deleted
        },
        {
          label: 'Scheduling',
          value: MixContentStatus.Schedule
        }
      ],
      key: 'status',
      type: 'select'
    }
  ];

  public fetchDataFn = (filter: PaginationRequestModel) =>
    this.databaseApi.gets(filter);

  constructor(private databaseApi: DatabaseApiService) {
    super();
  }

  public edit(id: number): void {
    this.route.navigateByUrl(`${RouteConfig.Database}/${id}`);
  }
}
