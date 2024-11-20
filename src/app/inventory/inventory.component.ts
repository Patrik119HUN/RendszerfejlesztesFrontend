import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IProductWithQuantity } from '../shared/model/product-with-quantity';
import { InventoryService } from './service/inventory.service';
import { IProduct } from '../shared/model/product';

@Component({
  selector: 'app-inventory',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatMenuModule, MatCardModule, CommonModule, MatIcon, MatIconModule, MatButtonModule, MatListItem, RouterLink, AsyncPipe],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  public $items: Observable<IProductWithQuantity[]>;

  public constructor(private inventoryService: InventoryService) {
    this.$items = this.getItems();
  }

  public getItems(): Observable<IProductWithQuantity[]> {
    const items: Observable<IProductWithQuantity[]> = this.inventoryService
      .getAllInventory()
      .pipe(map((inventories) => inventories.map((inventory) => inventory.items).flat()));
    return items;
  }

  public deleteProduct(id: number): void {
    console.error('Hiba történt a termék törlésekor:', id);
  }

  public editProduct(product: IProduct): void {
    console.log('Szerkesztés:', product);
  }
}
