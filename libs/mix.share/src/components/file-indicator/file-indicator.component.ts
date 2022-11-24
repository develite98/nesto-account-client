import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiFileLike, TuiFilesModule, TuiFileState } from '@taiga-ui/kit';

import { UploadApiService } from '../../services/api/upload-api.sevice';

@Component({
  selector: 'mix-file-indicator',
  standalone: true,
  imports: [CommonModule, TuiFilesModule, TuiSvgModule, TuiButtonModule],
  templateUrl: './file-indicator.component.html',
  styleUrls: ['./file-indicator.component.scss']
})
export class FileIndicatorComponent implements OnInit {
  @Input() public file!: TuiFileLike;
  @Input() public folder = 'MixContent/StaticFiles';
  @Output() public fileUploadSuccess: EventEmitter<TuiFileLike> =
    new EventEmitter();
  @Output() public remove: EventEmitter<void> = new EventEmitter();

  public state: TuiFileState = 'loading';

  constructor(private uploadApi: UploadApiService) {}

  ngOnInit(): void {
    this.makeRequest(this.file as File);
  }

  public makeRequest(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', this.folder);

    this.uploadApi.uploadFile(formData).subscribe({
      next: () => {
        this.state = 'normal';
        this.fileUploadSuccess.emit(file);
      },
      error: () => {
        this.state = 'error';
      }
    });
  }

  public onRemove(): void {
    this.remove.emit();
  }
}
