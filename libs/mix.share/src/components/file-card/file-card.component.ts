import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MixFile } from '@mix/mix.lib';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiFileLike,
  TuiFilesModule,
  TuiFileState,
  TuiInputCopyModule
} from '@taiga-ui/kit';

import { UploadApiService } from '../../services/api/upload-api.sevice';

@Component({
  selector: 'mix-file-card',
  standalone: true,
  imports: [
    CommonModule,
    TuiFilesModule,
    TuiButtonModule,
    TuiInputCopyModule,
    TuiSvgModule,
    FormsModule,
    TuiTextfieldControllerModule
  ],
  templateUrl: './file-card.component.html',
  styleUrls: ['./file-card.component.scss']
})
export class FileCardComponent {
  @Input() public file!: MixFile;
  public state: TuiFileState = 'normal';

  @Output() public fileDeleteSuccess: EventEmitter<void> = new EventEmitter();

  constructor(private uploadApi: UploadApiService) {}

  public get nativeFile(): TuiFileLike {
    return {
      name: `${this.file.filename}.${this.file.extension}`
    };
  }

  public onDelete(): void {
    if (this.file && this.file.fullPath) {
      this.state = 'loading';
      this.uploadApi.deleteFile(this.file.fullPath).subscribe({
        next: () => {
          this.fileDeleteSuccess.emit();
        }
      });
    }
  }
}
