import { Injectable } from '@angular/core';
import { BaseApiService } from '@mix/mix.share';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NestoUserDataApiService extends BaseApiService {
  public addAddress(address: any): Observable<void> {
    return this.post<any, void>(
      `/mix-services/userdata/add-address?${new URLSearchParams(
        address
      ).toString()}`,
      {}
    );
  }
}
