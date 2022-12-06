import { Injectable } from '@angular/core';
import {
  cryptoService,
  LocalStorageKeys,
  LoginModel,
  MixApiDict,
  TokenInfo,
  User,
  UserInfo
} from '@mix/mix.lib';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

import { BaseApiService } from '../../bases/base-api.service';

@Injectable({ providedIn: 'root' })
export class AuthApiService extends BaseApiService {
  public logout$: Subject<void> = new Subject();
  public isAuthorized$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );

  public logout(callback?: () => void): void {
    localStorage.removeItem(LocalStorageKeys.ACCESS_TOKEN);
    localStorage.removeItem(LocalStorageKeys.REFRESH_TOKEN);
    localStorage.removeItem(LocalStorageKeys.TOKEN_TYPE);
    this.logout$.next();
    if (callback) callback();
  }

  public login(
    loginData: LoginModel,
    apiEncryptKey: string
  ): Observable<TokenInfo> {
    const encrypted = cryptoService.encryptAES(
      JSON.stringify(loginData),
      apiEncryptKey
    );

    return this.post<{ message: string }, TokenInfo>(
      MixApiDict.ShareApi.signInEndpoint,
      { message: encrypted }
    ).pipe(
      tap((tokenInfo: TokenInfo) => {
        if (!tokenInfo || !tokenInfo.info) return;

        this.user$.next(tokenInfo.info);
        this.isAuthorized$.next(true);

        localStorage.setItem(
          LocalStorageKeys.ACCESS_TOKEN,
          tokenInfo.accessToken
        );

        localStorage.setItem(
          LocalStorageKeys.REFRESH_TOKEN,
          tokenInfo.refreshToken
        );

        localStorage.setItem(LocalStorageKeys.TOKEN_TYPE, tokenInfo.tokenType);
      })
    );
  }

  public fetchUserInfo(): Observable<UserInfo> {
    return this.get<UserInfo>(MixApiDict.ShareApi.getAccountProfileEndpoint);
  }

  public fetchUserData(): Observable<UserInfo> {
    return this.get<UserInfo>(MixApiDict.UserDataApi.getUserData);
  }

  public get getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  public get getTokenType(): string | null {
    return localStorage.getItem(LocalStorageKeys.TOKEN_TYPE);
  }
}
