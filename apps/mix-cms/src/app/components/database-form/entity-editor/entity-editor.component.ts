import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MixDataType } from '@mix/mix.lib';
import { SplitStringByUppercasePipe, StringUtils } from '@mix/mix.share';
import { InputLabeledComponent } from '@mix/mix.ui';
import {
  TuiButtonModule,
  TuiErrorModule,
  TuiExpandModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiCheckboxLabeledModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiSelectModule
} from '@taiga-ui/kit';

@Component({
  selector: 'mix-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.scss'],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiInputModule,
    ReactiveFormsModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDataListWrapperModule,
    InputLabeledComponent,
    TuiFieldErrorPipeModule,
    TuiErrorModule,
    SplitStringByUppercasePipe,
    TuiExpandModule,
    TuiCheckboxLabeledModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityEditorComponent implements OnInit {
  public dataTypes: MixDataType[] = Object.values(MixDataType);
  public isShowAdvanced = false;
  public isClickInside = false;
  public isFocus = false;

  @Input() public form: FormGroup = new FormGroup({
    displayName: new FormControl('', Validators.required),
    systemName: new FormControl('', Validators.required),
    dataType: new FormControl(MixDataType.CusTom, Validators.required),
    isRequired: new FormControl(false, Validators.required)
  });

  @Output() public removeChange: EventEmitter<void> = new EventEmitter<void>();
  @HostListener('click')
  public clickInside() {
    this.isClickInside = true;
    this.isFocus = true;
  }

  @HostListener('document:click')
  public clickOut() {
    if (!this.isClickInside) {
      this.isFocus = false;
    }
    this.isClickInside = false;
  }

  public get displayName(): FormControl<string> {
    return this.form.controls['displayName'] as FormControl<string>;
  }

  public get systemName(): FormControl<string> {
    return this.form.controls['systemName'] as FormControl<string>;
  }

  public get dataType(): FormControl<MixDataType> {
    return this.form.controls['dataType'] as FormControl<MixDataType>;
  }

  public ngOnInit(): void {
    this.displayName.valueChanges.subscribe(v => {
      this.systemName.patchValue(StringUtils.textToSystemName(v));
    });
  }

  public remove(): void {
    this.removeChange.emit();
  }
}
