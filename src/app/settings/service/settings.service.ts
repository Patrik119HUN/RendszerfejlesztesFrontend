import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISettings } from '../../shared/model/settings';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  private userApiUrl = '/api/v1/users';
  private companyApiUrl = '/api/v1/companies';

  public constructor(private http: HttpClient) { }

  public saveUserData(userData: ISettings['user']): Observable<void> {
    return this.http.put<void>(this.userApiUrl, userData);
  }


  public saveCompanyData(companyData: ISettings['company']): Observable<void> {
    return this.http.put<void>(this.companyApiUrl, companyData);
  }


  public getUserData(): Observable<ISettings['user']> {
    return this.http.get<ISettings['user']>(this.userApiUrl);
  }


  public getCompanyData(): Observable<ISettings['company'][]> {
    return this.http.get<ISettings['company'][]>(this.companyApiUrl);
  }
}
