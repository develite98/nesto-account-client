import { Injectable } from '@angular/core';
import {
  cryptoService,
  LocalStorageKeys,
  LoginModel,
  MixApiDict,
  SignUpModel,
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
    this.isAuthorized$.next(false);
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

        localStorage.setItem(
          LocalStorageKeys.ACCESS_TOKEN,
          tokenInfo.accessToken
        );

        localStorage.setItem(
          LocalStorageKeys.REFRESH_TOKEN,
          tokenInfo.refreshToken
        );

        localStorage.setItem(LocalStorageKeys.TOKEN_TYPE, tokenInfo.tokenType);

        this.user$.next(tokenInfo.info);
        this.isAuthorized$.next(true);
      })
    );
  }

  public register(userData: SignUpModel): Observable<void> {
    return this.post<SignUpModel, void>(
      MixApiDict.ShareApi.signUpEndpoint,
      userData
    );
  }

  public fetchUserInfo(): Observable<UserInfo> {
    return this.get<UserInfo>(MixApiDict.ShareApi.getAccountProfileEndpoint);
  }

  public fetchUserData(): Observable<UserData> {
    return this.get<UserData>(MixApiDict.UserDataApi.getUserData);
  }

  public updateUserProfile(userData: UserData): Observable<void> {
    return this.put<UserData, void>(
      MixApiDict.UserDataApi.updateProfile,
      userData
    );
  }

  public get getAccessToken(): string | null {
    return localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN);
  }

  public get getTokenType(): string | null {
    return localStorage.getItem(LocalStorageKeys.TOKEN_TYPE);
  }
}

export interface UserData {
  addresses?: Address[];
  fullname?: string;
  phoneNumber?: string;
  avatar?: string;
  gender?: string;
  email?: string;
  dateOfBirth?: Date;
}

export interface Address {
  id: number;
  name: string;
  email: string;
  phone: string;
  street: string;
  district: string;
  province: string;
  isDefault: boolean;
}
