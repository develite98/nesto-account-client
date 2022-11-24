import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  IFilter,
  PaginationRequestModel,
  PaginationResultModel
} from '@mix/mix.lib';
import { FormFieldConfig } from '@mix/mix.ui';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  debounceTime,
  forkJoin,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
  tap
} from 'rxjs';

import { BaseComponent } from '../../bases/base-component.component';
import {
  AppEvent,
  AppEventService,
  DestroyService,
  SubWorkspaceControllerService
} from '../../services';
import { Utils } from '../../utils';
import { TableColumnDirective } from './directives/column.directive';

@Component({
  selector: 'mix-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [DestroyService]
})
export class MixDataTableComponent<T>
  extends BaseComponent
  implements AfterContentInit, OnInit
{
  public readonly emptyData: PaginationResultModel<T> = {
    items: [],
    pagingData: {
      pageIndex: 0,
      pageSize: 25,
      total: 0
    }
  };
  public currentSelectedItem: T[] = [];
  public cacheItems: T[] = [];
  public currentPage = 0;
  public isAllSelected = false;
  public readonly menuItems = [
    { title: `View`, iconName: `tuiIconEyeOpen` },
    { title: `Delete`, iconName: `tuiIconTrash` }
  ] as const;
  public filterForms: FormGroup = new FormGroup({});
  public filterFieldConfig: FormFieldConfig[] = [];

  @Input() public filters: IFilter[] = [];
  @Input() public selfControl = true;
  @Input() public deleteDataFn!: (data: T) => Observable<void>;
  @Input() public fetchDataFn!: (
    filter: PaginationRequestModel
  ) => Observable<PaginationResultModel<T>>;
  @Input() public data$: BehaviorSubject<PaginationResultModel<T>> =
    new BehaviorSubject(this.emptyData);
  @Input() public override loading$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  @Input() public search = '';
  @Input() public searchPlaceholder = 'Search';
  @Input() public totalRows = 0;
  @Input() public searchable = true;
  @Input() public reOrderable = true;
  @Input() public dataIndexKey = 'id';
  @Input() public searchColumns = 'title';
  @Input() public showFilter = false;

  @Output() public pageChange: EventEmitter<number> = new EventEmitter();
  @Output() public pageSizeChange: EventEmitter<number> = new EventEmitter();
  @Output() public tableQueryChange: EventEmitter<PaginationRequestModel> =
    new EventEmitter();
  @Output() public itemsSelectedChange: EventEmitter<T[]> = new EventEmitter();
  @Output() public showFilterChange: EventEmitter<boolean> = new EventEmitter();

  @ContentChildren(TableColumnDirective)
  public columns!: QueryList<TableColumnDirective>;

  @ViewChild('filter', { static: true })
  public filterRef!: TemplateRef<unknown>;

  public tableSortFieldsInitial: readonly string[] = [];
  public tableSortFieldsSorted: readonly string[] = [];
  public tableInitialColumns: string[] = [];
  public tableColumns: string[] = [];
  public subTableColumns: string[] = [];
  public tableEnabledColumns: string[] = [];
  public tableSortFields: readonly string[] = [];
  public columnDic: Record<string, string> = {};
  public showSubTable = false;
  public firstLoad = true;
  public readonly searchText$: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public readonly filter$: BehaviorSubject<Record<string, any>> =
    new BehaviorSubject({});
  public readonly size$: Subject<number> = new Subject();
  public readonly page$: Subject<number> = new Subject();
  public readonly dragChange: Subject<number> = new Subject();
  public readonly direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<
    -1 | 1
  >(-1);
  public readonly reload$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public request$: Observable<
    [string, 1 | -1, number, number, boolean, Record<string, any>]
  > = combineLatest([
    this.searchText$.pipe(debounceTime(300)),
    this.direction$,
    this.page$.pipe(startWith(0)),
    this.size$.pipe(startWith(10)),
    this.reload$,
    this.filter$
  ]);

  constructor(
    private appEvent: AppEventService,
    private subWorkspaceController: SubWorkspaceControllerService,
    private _viewContainerRef: ViewContainerRef,
    private destroy: DestroyService
  ) {
    super();
  }

  public ngOnInit(): void {
    this._initFilter();
    this._setupSelfControl();
    this.appEvent
      .getEvent(AppEvent.Refresh)
      .pipe(takeUntil(this.destroy))
      .subscribe(() => {
        this.reloadData();
      });
  }

  public isItemSelected(item: T): boolean {
    return !!this.currentSelectedItem.find(
      (v: T) => JSON.stringify(v) === JSON.stringify(item)
    );
  }

  public ngAfterContentInit(): void {
    const columns: TableColumnDirective[] = this.columns.toArray();
    this.columnDic = this._buildColumnDictionary(columns);
    this.tableInitialColumns = columns.map((c: TableColumnDirective) => c.key);
    this.tableColumns = this.tableInitialColumns;
    this.tableSortFieldsInitial = columns.map(
      (c: TableColumnDirective) => c.header
    );
    this.tableSortFieldsSorted = this.tableSortFieldsInitial;
  }

  public onEnabled(enabled: readonly string[]) {
    this.tableColumns = this.tableSortFields
      .filter((key: string) => enabled.includes(key))
      .map((v: string) => this.columnDic[v]);
  }

  public onItemSelected(value: boolean, item: T): void {
    if (value) {
      this.currentSelectedItem.push(item);
    } else {
      this.currentSelectedItem = this.currentSelectedItem.filter(
        (v: T) => JSON.stringify(item) !== JSON.stringify(v)
      );
    }

    this.isAllSelected =
      this.currentSelectedItem.length === this.cacheItems.length;
    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public markAllChecked(value: boolean): void {
    if (value) {
      this.currentSelectedItem = this.cacheItems;
    } else {
      this.currentSelectedItem = [];
    }

    this.isAllSelected = value;
    this.itemsSelectedChange.emit(this.currentSelectedItem);
  }

  public reloadData(): void {
    this.reload$.next(!this.reload$.getValue());
  }

  public toggleFilter(): void {
    this.showFilter = !this.showFilter;
    this.toggleShowFilter(this.showFilter);
  }

  public deleteData(): void {
    if (!this.deleteDataFn) return;

    this.modal
      .confirm('Are you sure to delete these items ? Your data maybe lost ?')
      .subscribe((ok: boolean) => {
        if (ok) {
          const requests = this.currentSelectedItem.map(v =>
            this.deleteDataFn(v)
          );
          this._showLoading();
          forkJoin(requests)
            .pipe(this.toastLoadingState())
            .subscribe({
              next: () => {
                this.reloadData();
                this._hideLoading();
              },
              error: () => {
                this._hideLoading();
              }
            });
        }
      });
  }

  public toggleShowFilter(isShow: boolean): void {
    if (isShow) {
      this.subWorkspaceController.addSubWorkSpaceItem({
        id: 'DataTable_Filter',
        template: new TemplatePortal(this.filterRef, this._viewContainerRef),
        title: 'Filter'
      });
    } else {
      this.subWorkspaceController.removeSubWorkSpaceItem('DataTable_Filter');
    }
  }

  public ngOnDestroy(): void {
    this.subWorkspaceController.removeSubWorkSpaceItem('DataTable_Filter');
  }

  private _processSelfFetchData(
    searchText: string,
    page: number,
    pageSize: number,
    filter?: Record<string, any>
  ): Observable<PaginationResultModel<T>> {
    const request = {
      keyword: searchText,
      pageIndex: page,
      pageSize: pageSize,
      searchColumns: this.searchColumns,
      searchMethod: 'Like',
      direction: 'Desc',
      orderBy: 'createdDateTime'
    } as any;

    if (filter) {
      Object.keys(filter).forEach(key => {
        request[key] = filter[key];
      });
    }

    return this.fetchDataFn(request as unknown as PaginationRequestModel);
  }

  private _showLoading(): void {
    this.loading$.next(true);
  }

  private _hideLoading(): void {
    this.loading$.next(false);
  }

  private _buildColumnDictionary(
    columns: TableColumnDirective[]
  ): Record<string, string> {
    return columns.reduce(
      (acc: object, item: TableColumnDirective) => ({
        ...acc,
        [item.header]: item.key
      }),
      {}
    );
  }

  private _setupSelfControl(): void {
    this.request$
      .pipe(
        tap(() => this._showLoading()),
        switchMap(
          (
            query: [
              string,
              1 | -1,
              number,
              number,
              boolean,
              Record<string, any>
            ]
          ) =>
            this._processSelfFetchData(query[0], query[2], query[3], query[5])
        ),
        tap((res: PaginationResultModel<T>) => {
          this._hideLoading();
          this.cacheItems = res.items;
          this.currentPage = res.pagingData.pageIndex;
        }),
        startWith(this.emptyData),
        catchError(() => {
          this._hideLoading();
          return of(this.emptyData);
        })
      )
      .subscribe(result => {
        if (Utils.isDifferent(result, this.emptyData)) this.firstLoad = false;
        this.data$.next(result);
      });
  }

  private _initFilter(): void {
    this.filters.forEach(filter => {
      this.filterFieldConfig.push({
        key: filter.key,
        type: filter.type,
        props: {
          label: filter.title,
          options: filter.options,
          description: `Choose ${filter.title}`
        },
        hooks: {
          onInit: field => {
            field.formControl?.valueChanges.subscribe(obj => {
              const a: Record<string, any> = {};
              a[filter.key] = obj.value;

              if (a) {
                this.filter$.next(a);
              }
            });
          }
        }
      });
    });
  }
}
