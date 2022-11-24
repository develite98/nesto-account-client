import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  MixDatabaseModel,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { DatabaseApiService } from '@mix/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'mix-database-table-tree',
  templateUrl: './database-table-tree.component.html',
  styleUrls: ['./database-table-tree.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiButtonModule]
})
export class DatabaseTableTreeComponent implements OnInit {
  public getParams: PaginationRequestModel = {
    keyword: '',
    pageIndex: 0,
    pageSize: 10,
    searchColumns: 'title',
    searchMethod: 'Like',
    direction: 'Desc',
    orderBy: 'createdDateTime'
  };

  public database: PaginationResultModel<MixDatabaseModel> | undefined =
    undefined;

  constructor(
    public databaseApi: DatabaseApiService,
    public cdr: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.databaseApi.gets(this.getParams).subscribe({
      next: result => {
        this.database = result;
        this.cdr.detectChanges();
      }
    });
  }
}
