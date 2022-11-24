import { Component, ViewContainerRef } from '@angular/core';
import {
  IFilter,
  MixContentStatus,
  MixModulePortalModel,
  PaginationRequestModel
} from '@mix/mix.lib';
import {
  BaseComponent,
  MixDataTableModule,
  MixGlobalFilterComponent,
  MixModuleApiService,
  MixStatusIndicatorComponent,
  RouteConfig,
  ShareModule,
  SubWorkspaceControllerService
} from '@mix/mix.share';

@Component({
  selector: 'mix-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss'],
  standalone: true,
  imports: [
    ShareModule,
    MixDataTableModule,
    MixStatusIndicatorComponent,
    MixGlobalFilterComponent
  ]
})
export class ModuleListComponent extends BaseComponent {
  constructor(
    public moduleApi: MixModuleApiService,
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
    this.moduleApi.gets(query);
  public deleteDataFn = (data: MixModulePortalModel) =>
    this.moduleApi.remove(data.id);

  public edit(id: number): void {
    this.route.navigateByUrl(`${RouteConfig.Module}/${id}`).then();
  }

  public ngOnDestroy(): void {
    this.subWorkSpaceController.removeSubWorkSpaceItem(
      'PostListComponent_Filter'
    );
  }
}
