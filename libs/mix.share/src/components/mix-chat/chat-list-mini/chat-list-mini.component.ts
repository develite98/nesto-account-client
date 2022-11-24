import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MixUser } from '@mix/mix.lib';
import {
  AuthApiService,
  SignalEventType,
  UserSignalService
} from '@mix/mix.share';
import { TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

@Component({
  selector: 'mix-chat-list-mini',
  templateUrl: './chat-list-mini.component.html',
  styleUrls: ['./chat-list-mini.component.scss'],
  standalone: true,
  imports: [CommonModule, TuiSvgModule, TuiAvatarModule, TuiHintModule]
})
export class MixChatListMiniComponent implements OnInit {
  public onlineUsers: MixUser[] = [];

  constructor(
    private userSignal: UserSignalService,
    private cdr: ChangeDetectorRef,
    private auth: AuthApiService
  ) {}

  public ngOnInit(): void {
    this.userSignal.getMessage().subscribe(v => {
      if (v.type === SignalEventType.MemberList) {
        this.onlineUsers = (v.data as any[]).map((u, i) => {
          return <MixUser>{
            userName: u.username ?? `${i} Uknown User`,
            connectionId: u.connectionId,
            avatar: u.avatar
          };
        });
        this.cdr.detectChanges();
      } else if (v.type === SignalEventType.MemberOffline) {
        this.onlineUsers = this.onlineUsers.filter(
          user => user.connectionId !== (v.data as any).connectionId
        );
        this.cdr.detectChanges();
      } else if (v.type === SignalEventType.NewMember) {
        this.onlineUsers.push(<MixUser>{
          userName: (v.data as any).username ?? `New Uknown User`,
          connectionId: (v.data as any).connectionId,
          avatar: (v.data as any).avatar
        });
        this.cdr.detectChanges();
      }
    });

    this.auth.logout$.subscribe(() => {
      this.userSignal.stopHub();
    });
  }
}
