import { TemplatePortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

export interface SubWorkSpaceItem {
  id: string;
  template?: TemplatePortal<unknown>;
  title: string;
  open?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SubWorkspaceControllerService {
  public subWorkSpaceItems: BehaviorSubject<SubWorkSpaceItem[]> =
    new BehaviorSubject<SubWorkSpaceItem[]>([]);
  public newAddItem: Subject<SubWorkSpaceItem> =
    new Subject<SubWorkSpaceItem>();

  public showSubWorkspace$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public addSubWorkSpaceItem(item: SubWorkSpaceItem): void {
    const cur = this.subWorkSpaceItems.getValue();
    if (cur.find(i => i.id == item.id)) return;

    if (cur && cur.length) {
      cur.forEach(v => (v.open = false));
    }

    item.open = true;
    cur.push(item);
    this.newAddItem.next(item);
    this.subWorkSpaceItems.next(cur);
  }

  public removeSubWorkSpaceItem(id: string): void {
    let cur = this.subWorkSpaceItems.getValue();
    cur = cur.filter(v => v.id !== id);
    this.subWorkSpaceItems.next(cur);
  }

  public toggleSubWorkspace(): void {
    this.showSubWorkspace$.next(!this.showSubWorkspace$.getValue());
  }
}
