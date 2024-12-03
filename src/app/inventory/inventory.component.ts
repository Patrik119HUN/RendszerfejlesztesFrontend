import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListItem } from '@angular/material/list';
import { map, Observable, tap } from 'rxjs';
import { IProductWithQuantity } from '../shared/model/product-with-quantity';
import { IProduct } from '../shared/model/product';
import { CreateProductDialogComponent } from './create-item-dialog/create-item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  AddProductDialogComponent,
  IAddProductToWarehouseResult,
} from './add-item-dialog/add-item-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import {IInventoryRequest, InventoryService} from "../shared/services/inventory.service";
import {ItemService} from "../shared/services/item.service";
import {WarehouseService} from "../shared/services/warehouse.service";

enum InventoryType {
  WAREHOUSE = 'warehouse',
  ALL = 'all',
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatMenuModule,
    MatCardModule,
    CommonModule,
    MatIcon,
    MatIconModule,
    MatButtonModule,
    MatListItem,
    AsyncPipe,
  ],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  @Input() public id: number;

  public inventoryType = InventoryType.ALL;
  public inventory$: Observable<IProductWithQuantity[]>;

  public constructor(
    private readonly inventoryService: InventoryService,
    private readonly itemService: ItemService,
    private readonly warehouseService: WarehouseService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.inventoryType = this.id ? InventoryType.WAREHOUSE : InventoryType.ALL;

    if (this.inventoryType === InventoryType.ALL) {
      this.inventory$ = this.itemService
        .getAllItems()
        .pipe(map((items) => items.map((item) => ({ item, quantity: 0 } as IProductWithQuantity))));
    }

    if (this.inventoryType === InventoryType.WAREHOUSE) {
      this.inventory$ = this.warehouseService
        .getWarehouseById(this.id)
        .pipe(map((inventory) => inventory.items));
    }
  }

  public deleteProduct(product: IProductWithQuantity): void {
    if (this.inventoryType === InventoryType.WAREHOUSE) {
      this.inventoryService.deleteInventory(product.id).subscribe();
    }
    if (this.inventoryType === InventoryType.ALL) {
      console.log('Delete item with id: ', product.item.id);
      this.itemService.deleteItem(product.item.id).subscribe();
    }
  }

  public editProduct(product: IProductWithQuantity): void {
    const formDialog: ComponentType<CreateProductDialogComponent | AddProductDialogComponent> =
      this.inventoryType === InventoryType.ALL
        ? CreateProductDialogComponent
        : AddProductDialogComponent;
    const value: IProductWithQuantity | IProduct =
      this.inventoryType === InventoryType.ALL ? product.item : product;
    const dialogRef = this.dialog.open(formDialog, {
      data: { product: value, isNew: false },
      width: '600px',
    });

    dialogRef
      .afterClosed()
      .pipe(
        tap((result: IAddProductToWarehouseResult | IProduct) => {
          if (!result) return;

          if (this.inventoryType === InventoryType.ALL) {
            this.itemService.updateItem(result as IProduct).subscribe();
          }

          if (this.inventoryType === InventoryType.WAREHOUSE) {
            const inventoryRequest = {
              id: product.id,
              item: (result as IAddProductToWarehouseResult).item,
              quantity: (result as IAddProductToWarehouseResult).quantity,
            } as IProductWithQuantity;
            this.inventoryService.updateInventory(inventoryRequest).subscribe();
          }
        })
      )
      .subscribe();
  }

  public addItemToWarehouse(): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: { product: null, isNew: true },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        const inventoryRequest = {
          warehouseId: this.id,
          itemId: newProduct.item.id,
          quantity: newProduct.quantity,
        } as IInventoryRequest;

        this.inventoryService.addItemToWarehouse(inventoryRequest).subscribe(() => {});
      }
    });
  }

  public createItem(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      data: { product: null, isNew: true },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        const itemRequest = {
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
        } as IProduct;

        this.itemService.createItem(itemRequest).subscribe();
      }
    });
  }
}
