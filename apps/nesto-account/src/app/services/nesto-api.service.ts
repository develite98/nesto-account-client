import { Injectable } from '@angular/core';
import { MixApiDict } from '@mix/mix.lib';
import { BaseApiService } from '@mix/mix.share';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NestoUserDataApiService extends BaseApiService {
  public addAddress(address: any): Observable<void> {
    return this.post<any, void>(
      `${MixApiDict.UserDataApi.addAddress}?${new URLSearchParams(
        address
      ).toString()}`,
      {}
    );
  }

  public deleteAddress(id: number): Observable<void> {
    return this.delete<void>(MixApiDict.UserDataApi.deleteAddress + id);
  }
}
