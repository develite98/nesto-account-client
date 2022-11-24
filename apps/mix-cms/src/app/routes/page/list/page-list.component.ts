import { Component, ViewContainerRef } from '@angular/core';
import {
  IFilter,
  MixContentStatus,
  MixPagePortalModel,
  PaginationRequestModel
} from '@mix/mix.lib';
import {
  BaseComponent,
  MixDataTableModule,
  MixGlobalFilterComponent,
  MixPageApiService,
  MixStatusIndicatorComponent,
  RouteConfig,
  ShareModule,
  SubWorkspaceControllerService
} from '@mix/mix.share';

@Component({
  selector: 'mix-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    MixGlobalFilterComponent
  ]
})
export class PageListComponent extends BaseComponent {
  constructor(
    public pageApi: MixPageApiService,
    public subWorkSpaceController: SubWorkspaceControllerService,
    private _viewContainerRef: ViewContainerRef
  ) {
    super();
  }

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

  public requestFn = (query: PaginationRequestModel) =>
    this.pageApi.gets(query);
  public deleteDataFn = (data: MixPagePortalModel) =>
    this.pageApi.remove(data.id);

  public edit(id: number): void {
    this.route.navigateByUrl(`${RouteConfig.Page}/${id}`).then();
  }
}
