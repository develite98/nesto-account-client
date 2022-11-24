import { ContentChild, Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[mixSideMenuChildItem]',
  standalone: true
})
export class SideMenuChildItemDirective {
  @Input() public key = '';
  @ContentChild('template', { static: true }) public tpl!: TemplateRef<unknown>;
}
