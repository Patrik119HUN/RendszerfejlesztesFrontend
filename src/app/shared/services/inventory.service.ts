import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInventory } from '../model/inventory';
import { IProductWithQuantity } from '../model/product-with-quantity';

export interface IInventoryRequest {
  warehouseId: number;
  itemId: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private apiUrl = '/api/v1/inventory';

  public constructor(private readonly http: HttpClient) {}

  public getAllInventory(): Observable<IInventory[]> {
    return this.http.get<IInventory[]>(this.apiUrl);
  }

  public getInventoryyId(id: number): Observable<IInventory> {
    return this.http.get<IInventory>(`${this.apiUrl}/${id}`);
  }

  public addItemToWarehouse(inventory: IInventoryRequest): Observable<IInventoryRequest> {
    return this.http.post<IInventoryRequest>(this.apiUrl, inventory);
  }

  public updateInventory(inventory: IProductWithQuantity): Observable<IProductWithQuantity> {
    return this.http.put<IProductWithQuantity>(this.apiUrl, inventory);
  }

  public deleteInventory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
