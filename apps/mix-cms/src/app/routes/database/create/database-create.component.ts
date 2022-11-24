import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MixDatabaseModel } from '@mix/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DatabaseApiService
} from '@mix/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';

import { DatabaseFormComponent } from '../../../components/database-form/database-form.component';
import { RouteConfig } from '../../route.const';

@Component({
  selector: 'mix-database-create',
  templateUrl: './database-create.component.html',
  styleUrls: ['./database-create.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatabaseFormComponent,
    TuiButtonModule,
    ContentDetailContainerComponent
  ]
})
export class DatabaseCreateComponent extends BaseComponent implements OnInit {
  @ViewChild(DatabaseFormComponent, { static: false })
  public databaseForm!: DatabaseFormComponent;
  public databaseModel: MixDatabaseModel | undefined = undefined;

  constructor(
    public databaseApi: DatabaseApiService,
    public cdr: ChangeDetectorRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.databaseApi.getDefault().subscribe({
      next: database => {
        this.databaseModel = database;
        this.cdr.detectChanges();
      }
    });
  }

  public createDatabase(): void {
    const database = this.databaseForm.submit();
    if (database) {
      this.databaseApi
        .save(database)
        .pipe(this.toastLoadingState())
        .subscribe({
          next: () => {
            this.route.navigateByUrl(RouteConfig.DatabaseList);
          }
        });
    }
  }
}
