import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent, UploadApiService } from '@mix/mix.share';

@Component({
  selector: 'mix-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss']
})
export class UserAvatarComponent extends BaseComponent implements OnInit {
  @Input() public avatar = '';
  @Output() public avatarChange: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('upload', { static: true })
  public uploadBtn!: ElementRef<HTMLInputElement>;
  public fileForm = new FormControl();

  constructor(public uploadApi: UploadApiService) {
    super();
  }

  public onUpload(): void {
    this.uploadBtn.nativeElement.click();
  }

  ngOnInit(): void {
    this.fileForm.valueChanges.subscribe(file => console.log(file));
  }

  public onFileChange(event: Event): void {
    const file = (event.target as unknown as any).files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'MixContent/StaticFiles/');

      this.uploadApi
        .uploadFile(formData)
        .pipe(
          this.toast.observe({
            loading: 'Uploading',
            success: 'Successfully upload your avatar, please saved it',
            error: 'Something wrong, please try again'
          })
        )
        .subscribe({
          next: filePath => {
            this.avatar = filePath;
            this.avatarChange.emit(filePath);
          }
        });
    }
  }
}
