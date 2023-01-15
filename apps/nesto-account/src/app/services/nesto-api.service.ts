import { Injectable } from '@angular/core';
import { MixApiDict } from '@mix/mix.lib';
import { BaseApiService } from '@mix/mix.share';
import { Observable } from 'rxjs';

import { Address } from '../models/user-data.model';

@Injectable({ providedIn: 'root' })
export class NestoUserDataApiService extends BaseApiService {
  public addAddress(address: any): Observable<any> {
    return this.post<any, void>(MixApiDict.UserDataApi.addAddress, address);
  }

  public updateAddress(address: any): Observable<Address> {
    return this.put<any, Address>(
      MixApiDict.UserDataApi.updateAddress,
      address
    );
  }

  public deleteAddress(id: number): Observable<void> {
    return this.delete<void>(MixApiDict.UserDataApi.deleteAddress + id);
  }

  // public addAddress(address: any) {
  //   return from(
  //     fetch(`${this.url}${MixApiDict.UserDataApi.addAddress}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `${localStorage.getItem(
  //           LocalStorageKeys.TOKEN_TYPE
  //         )} ${localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)}`
  //       },
  //       body: JSON.stringify(address)
  //     })
  //   );
  // }
}
