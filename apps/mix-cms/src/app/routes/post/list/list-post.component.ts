import { Component, ViewContainerRef } from '@angular/core';
import {
  IFilter,
  MixContentStatus,
  MixPostPortalModel,
  PaginationRequestModel
} from '@mix/mix.lib';
import {
  BaseComponent,
  MixDataTableModule,
  MixGlobalFilterComponent,
  MixPostApiService,
  MixStatusIndicatorComponent,
  RouteConfig,
  ShareModule,
  SubWorkspaceControllerService
} from '@mix/mix.share';

@Component({
  selector: 'mix-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixGlobalFilterComponent,
    MixStatusIndicatorComponent,
    MixDataTableModule
  ]
})
export class ListPostComponent extends BaseComponent {
  constructor(
    public postApi: MixPostApiService,
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
    this.postApi.gets(query);
  public deleteDataFn = (data: MixPostPortalModel) =>
    this.postApi.remove(data.id);

  public edit(id: number): void {
    this.route.navigateByUrl(`${RouteConfig.Post}/${id}`).then();
  }
}
