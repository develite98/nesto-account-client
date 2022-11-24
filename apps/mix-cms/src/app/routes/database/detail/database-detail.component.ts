import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MixDatabaseModel } from '@mix/mix.lib';
import {
  BaseComponent,
  ContentDetailContainerComponent,
  DatabaseApiService,
  SubWorkspaceControllerService
} from '@mix/mix.share';
import { TuiButtonModule } from '@taiga-ui/core';

import { DatabaseFormComponent } from '../../../components/database-form/database-form.component';
import { DatabaseTableTreeComponent } from '../../../components/database-table-tree/database-table-tree.component';

@Component({
  selector: 'mix-database-detail',
  templateUrl: './database-detail.component.html',
  styleUrls: ['./database-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DatabaseFormComponent,
    TuiButtonModule,
    ContentDetailContainerComponent,
    DatabaseTableTreeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatabaseDetailComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('databaseTree', { static: true })
  public databaseTree!: TemplateRef<unknown>;

  @ViewChild(DatabaseFormComponent, { static: false })
  public databaseForm!: DatabaseFormComponent;
  public database: MixDatabaseModel | undefined = undefined;

  constructor(
    public databaseApi: DatabaseApiService,
    public activatedRoute: ActivatedRoute,
    public cdr: ChangeDetectorRef,
    public subWorkSpaceController: SubWorkspaceControllerService,
    private _viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  public ngOnInit(): void {
    this.databaseApi
      .getById(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: database => {
          this.database = database;
          this.cdr.detectChanges();
        }
      });

    this.subWorkSpaceController.addSubWorkSpaceItem({
      id: 'DatabaseFormComponent_TableTree',
      template: new TemplatePortal(this.databaseTree, this._viewContainerRef),
      title: 'Tables'
    });
  }

  public saveDatabase(): void {
    const database = this.databaseForm.submit();
    if (database) {
      this.databaseApi
        .save(database)
        .pipe(this.toastLoadingState())
        .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.subWorkSpaceController.removeSubWorkSpaceItem(
      'DatabaseFormComponent_TableTree'
    );
  }
}
