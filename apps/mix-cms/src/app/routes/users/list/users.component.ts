import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationRequestModel } from '@mix/mix.lib';
import {
  BaseComponent,
  MixDataTableModule,
  UserApiService
} from '@mix/mix.share';
import { TuiLinkModule } from '@taiga-ui/core';

import { RouteConfig } from '../../route.const';

@Component({
  selector: 'mix-users',
  standalone: true,
  imports: [CommonModule, MixDataTableModule, TuiLinkModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent {
  constructor(private userApi: UserApiService) {
    super();
  }
  public fetchDataFn = (request: PaginationRequestModel) =>
    this.userApi.getUsers(request);

  public edit(userId: string): void {
    this.route.navigateByUrl(`${RouteConfig.User}/${userId}`).then();
  }
}
