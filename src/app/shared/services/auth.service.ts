import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

export interface IUserRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  requestType: 'user' | 'company';
}
export interface ICompanyRegisterRequest extends IUserRegisterRequest {
  companyName: string;
  postalCode: string;
  city: string;
  street: string;
  houseNumber: string;
}

type IRegisterRequest = IUserRegisterRequest | ICompanyRegisterRequest;
interface LoginResponse {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/v1/auth';

  public constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) {}

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/signin`, {
      email,
      password,
    });
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signout`, null);
  }

  public register(userDetails: IRegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/signup`, userDetails);
  }

  public isLoggedIn(): boolean {
    if (this.cookieService.get('JSESSIONID')) {
      return true;
    }
    return false;
  }
}
