import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyTaigaModule, SkeletonLoadingComponent } from '@mix/mix.ui';
import {
  TuiReorderModule,
  TuiTableModule,
  TuiTablePaginationModule
} from '@taiga-ui/addon-table';
import { TuiLetModule } from '@taiga-ui/cdk';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiHostedDropdownModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiCheckboxModule,
  TuiInputCountModule,
  TuiInputModule,
  TuiPaginationModule
} from '@taiga-ui/kit';
import { TablerIconsModule } from 'angular-tabler-icons';

import { RelativeTimeSpanPipe } from '../../pipes';
import { MixToolbarComponent } from '../mix-toolbar';
import { MixDataTableComponent } from './data-table.component';
import { TableCellDirective } from './directives/cell.directive';
import { TableColumnDirective } from './directives/column.directive';
import { TableHeaderDirective } from './directives/header.directive';

@NgModule({
  declarations: [
    MixDataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiTableModule,
    TuiInputModule,
    TuiInputCountModule,
    TuiHostedDropdownModule,
    TuiReorderModule,
    TuiTextfieldControllerModule,
    TuiTablePaginationModule,
    TuiLetModule,
    TuiLoaderModule,
    TuiCheckboxModule,
    TuiPaginationModule,
    RelativeTimeSpanPipe,
    DragDropModule,
    TablerIconsModule,
    TuiSvgModule,
    SkeletonLoadingComponent,
    TuiTablePaginationModule,
    MixToolbarComponent,
    TuiDropdownModule,
    TuiDataListModule,
    FormlyTaigaModule
  ],
  exports: [
    MixDataTableComponent,
    TableHeaderDirective,
    TableCellDirective,
    TableColumnDirective
  ]
})
export class MixDataTableModule {}
