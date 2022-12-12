import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProvinceApiService {
  constructor(private httpClient: HttpClient) {}

  public getProvince(): Observable<any> {
    return this.httpClient.get('assets/datas/province.json');
  }
}
