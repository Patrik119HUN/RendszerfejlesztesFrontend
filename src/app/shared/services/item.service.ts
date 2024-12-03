import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { IProduct } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = '/api/v1/items';

  public constructor(private http: HttpClient) {}


  public getAllItems(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.apiUrl);
  }

  public getItemById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}/${id}`);
  }

  public createItem(item: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.apiUrl, item);
  }

  public updateItem(item: IProduct): Observable<IProduct> {
    return this.http.put<IProduct>(this.apiUrl, item);
  }

  public deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
