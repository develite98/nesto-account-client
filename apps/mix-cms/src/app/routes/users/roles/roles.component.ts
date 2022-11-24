import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationRequestModel } from '@mix/mix.lib';
import {
  BaseComponent,
  MixDataTableModule,
  RoleApiService
} from '@mix/mix.share';

@Component({
  selector: 'mix-roles',
  standalone: true,
  imports: [CommonModule, MixDataTableModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent extends BaseComponent {
  constructor(public roleApi: RoleApiService) {
    super();
  }

  public fetchDataFn = (request: PaginationRequestModel) =>
    this.roleApi.getRoles(request);
}
