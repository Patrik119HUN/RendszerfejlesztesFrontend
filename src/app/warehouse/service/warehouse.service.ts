import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWarehouse } from '../../shared/model/warehouse';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private apiUrl = '/api/v1/warehouses';

  public constructor(private http: HttpClient) {}

  public getAllWarehouses(): Observable<IWarehouse[]> {
    return this.http.get<IWarehouse[]>(this.apiUrl+"/all");
  }

  public getWarehouseById(id: number): Observable<IWarehouse> {
    return this.http.get<IWarehouse>(`${this.apiUrl}/${id}`);
  }

  public createWarehouse(warehouse: IWarehouse): Observable<IWarehouse> {
    return this.http.post<IWarehouse>(this.apiUrl, warehouse);
  }

  public updateWarehouse(warehouse: IWarehouse): Observable<IWarehouse> {
    return this.http.put<IWarehouse>(this.apiUrl, warehouse);
  }

  public deleteWarehouse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
