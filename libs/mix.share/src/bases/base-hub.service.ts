import { Inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions
} from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';

import { SignalEvent } from '../interfaces/signal-event';
import { SignalEventType } from '../interfaces/signal-event-type';
import { AuthApiService } from '../services/api/auth-api.service';
import { DOMAIN_URL } from '../token';

@Injectable({ providedIn: 'root' })
export abstract class BaseSignalService {
  public _signalEvent: Subject<SignalEvent<any>> = new Subject<any>();
  public _openConnection = false;
  public _isInitializing = false;
  public _hubConnection!: HubConnection;
  protected get _hubName() {
    return '';
  }
  protected get _roomName() {
    return '';
  }

  abstract _setupSignalREvents(): void;

  constructor(
    @Inject(DOMAIN_URL) public domain: string,
    private readonly authService: AuthApiService
  ) {}

  public getMessage<T>(
    ...filterValues: SignalEventType[]
  ): Observable<SignalEvent<T>> {
    this._ensureConnection();
    return this._signalEvent
      .asObservable()
      .pipe
      // filter(event =>
      //   filterValues.length ? filterValues.some(f => f === event.type) : true
      // )
      ();
  }

  public stopHub() {
    this._hubConnection.stop().then(() => {
      this._openConnection = false;
    });
  }

  protected async _initializeSignalR() {
    const hubOptions: IHttpConnectionOptions = {
      accessTokenFactory: () => `${this.authService.getAccessToken}`,
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    };
    this._openConnection = true;
    this._isInitializing = false;
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(this.domain + 'hub/' + this._hubName, hubOptions)
      .withAutomaticReconnect()
      .build();

    try {
      await this._hubConnection.start();
      this._setupSignalREvents();
      await this._hubConnection.invoke('JoinRoom', this._roomName);
    } catch (err) {
      this._hubConnection.stop().then(_ => {
        this._openConnection = false;
      });
    }
  }

  protected async _ensureConnection() {
    if (this._openConnection || this._isInitializing) return;
    await this._initializeSignalR();
  }

  protected _pushMessage<T>(payload: SignalEvent<T>) {
    this._signalEvent.next(payload);
  }
}
