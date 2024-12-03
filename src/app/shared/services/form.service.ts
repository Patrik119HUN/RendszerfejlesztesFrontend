import { Injectable } from '@angular/core';
import { distinctUntilChanged, map, Observable, startWith, tap, throttleTime } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public constructor() {}

  public autoCompleteFilter<T>(
    items: T[],
    filterField: Observable<string>,
    filterPredicate: (value: string, items: T[]) => T[]
  ): Observable<T[]> {
    return filterField.pipe(
      tap((value) => console.log(value)),
      throttleTime(300),
      startWith(''),
      map((value) => filterPredicate(value, items)),
      distinctUntilChanged(),
      tap((items) => console.log(items))
    );
  }
}
