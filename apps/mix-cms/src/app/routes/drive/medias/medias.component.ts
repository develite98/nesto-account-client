import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationRequestModel } from '@mix/mix.lib';
import {
  MixDataTableModule,
  MixFileApiService,
  MixStatusIndicatorComponent
} from '@mix/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-medias',
  standalone: true,
  imports: [
    CommonModule,
    MixDataTableModule,
    TuiButtonModule,
    MixStatusIndicatorComponent
  ],
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.scss']
})
export class MediasComponent {
  constructor(public fileApiService: MixFileApiService) {}
  public fetchDataFn = (request: PaginationRequestModel) =>
    this.fileApiService.getMedias(request);

  public edit(id: number): void {
    //
  }
}
