import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MixTemplateFolder, MixTemplateModel } from '@mix/mix.lib';
import { BaseComponent, MixFolderFileComponent } from '@mix/mix.share';

@Component({
  selector: 'mix-theme-template-tree',
  standalone: true,
  imports: [CommonModule, MixFolderFileComponent],
  templateUrl: './theme-template-tree.component.html',
  styleUrls: ['./theme-template-tree.component.scss']
})
export class ThemeTemplateTreeComponent extends BaseComponent {
  public themeId = 1;
  public FOLDER = MixTemplateFolder;

  constructor(private activatedRoute: ActivatedRoute) {
    super();
    this.themeId = this.activatedRoute.snapshot?.params['themeId'];
  }

  public templateClick(template: MixTemplateModel): void {
    this.route.navigateByUrl(`theme/${this.themeId}/template/${template.id}`);
  }
}
