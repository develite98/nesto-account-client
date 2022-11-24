import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineEditPlaceholderComponent } from '@mix/mix.ui';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { TuiToggleModule } from '@taiga-ui/kit';

import { IconsModule } from '../../icons.module';

@Component({
  selector: 'mix-content-detail-container',
  templateUrl: './content-detail-container.component.html',
  styleUrls: ['./content-detail-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiToggleModule,
    InlineEditPlaceholderComponent,
    FormsModule,
    TuiHostedDropdownModule,
    TuiDataListModule,
    IconsModule
  ]
})
export class ContentDetailContainerComponent implements OnInit {
  public autoSave: FormControl = new FormControl(true);
  public items = [
    { title: 'Clear cache', action: () => undefined },
    { title: 'Duplicate', action: () => undefined }
  ];

  @Input() public buttonText = 'Save';
  @Input() public editTitle = true;
  @Input() public contentTitle: FormControl | undefined = undefined;
  @Output() public autoSaveChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public save: EventEmitter<void> = new EventEmitter<void>();
  @Output() public titleChange: EventEmitter<string> = new EventEmitter();

  public ngOnInit(): void {
    this.autoSave.valueChanges.subscribe((v: boolean) =>
      this.autoSaveChange.emit(v)
    );
  }

  public onSave(): void {
    this.save.emit();
  }
}
