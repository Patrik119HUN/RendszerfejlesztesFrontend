import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ITransport {
  fromWarehouseId: number;
  toWarehouseId: number;
  items: { itemId: number; quantity: number }[];
}

@Injectable({
  providedIn: 'root',
})
export class TransportService {
  private apiUrl = '/api/v1/transport';

  public constructor(private http: HttpClient) {}

  public transportItems(transport: ITransport): Observable<void> {
    return this.http.post<void>(this.apiUrl, transport);
  }
}
