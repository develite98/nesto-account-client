import { TemplatePortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BaseComponent,
  SubWorkspaceControllerService,
  TemplateEditorComponent
} from '@mix/mix.share';

import { ThemeTemplateTreeComponent } from '../../../components/theme-template-tree/theme-template-tree.component';

@Component({
  selector: 'mix-template-detail',
  standalone: true,
  imports: [CommonModule, TemplateEditorComponent, ThemeTemplateTreeComponent],
  templateUrl: './template-detail.component.html',
  styleUrls: ['./template-detail.component.scss']
})
export class TemplateDetailComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  @ViewChild('templateTree', { static: true })
  public templateTree!: TemplateRef<unknown>;

  public templateId: number | undefined = undefined;
  constructor(
    public activatedRoute: ActivatedRoute,
    public subWorkSpaceController: SubWorkspaceControllerService,
    private _viewContainerRef: ViewContainerRef
  ) {
    super();
    activatedRoute.params.subscribe(params => {
      this.templateId = params['templateId'];
    });
  }

  public ngOnInit(): void {
    this.subWorkSpaceController.addSubWorkSpaceItem({
      id: 'TemplateDetailComponent_TemplateTree',
      template: new TemplatePortal(this.templateTree, this._viewContainerRef),
      title: 'Templates'
    });
  }

  public ngOnDestroy(): void {
    this.subWorkSpaceController.removeSubWorkSpaceItem(
      'TemplateDetailComponent_TemplateTree'
    );
  }
}
