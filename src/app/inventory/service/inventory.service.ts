import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInventory } from '../../shared/model/inventory';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = '/api/v1/inventories';

  public constructor(private readonly http: HttpClient) {}

  public getAllInventory(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(this.apiUrl);
  }

  public getInventoryyId(id: number): Observable<IInventory> {
    return this.http.get<IInventory>(`${this.apiUrl}/${id}`);
  }

  public createInventory(inventory: IInventory): Observable<IInventory> {
    return this.http.post<IInventory>(this.apiUrl, inventory);
  }

  public updateInventory(inventory: IInventory): Observable<IInventory> {
    return this.http.put<IInventory>(this.apiUrl, inventory);
  }

  public deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
