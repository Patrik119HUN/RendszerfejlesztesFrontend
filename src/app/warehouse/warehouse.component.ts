import { Component } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { WarehouseDialogComponent } from './warehouse-dialog/warehouse-dialog.component';
import { Observable } from 'rxjs';
import { IWarehouse } from '../shared/model/warehouse';
import {WarehouseService} from "../shared/services/warehouse.service";

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [
    MatFabButton,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIcon,
    MatCard,
    MatCardContent,
    MatIconButton,
    AsyncPipe,
  ],
  templateUrl: './warehouse.component.html',
  styleUrl: './warehouse.component.css',
})
export class WarehouseComponent {
  public warehouses: Observable<IWarehouse[]>;

  public constructor(
    private warehouseService: WarehouseService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.warehouses = this.warehouseService.getUserWarehouses();
  }

  public loadWarehouses(): Observable<IWarehouse[]> {
    return this.warehouseService.getUserWarehouses();
  }

  public listItems(warehouse: IWarehouse): void {
    this.router.navigate([`/inventory/${warehouse.id}`]);
  }

  public editWarehouse(warehouse: IWarehouse): void {
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      data: { warehouse: warehouse, isNew: false },
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseService.updateWarehouse(result).subscribe(() => {
          this.warehouses = this.loadWarehouses();
        });
      }
    });
  }

  public addWarehouse(): void {
    const dialogRef = this.dialog.open(WarehouseDialogComponent, {
      data: { isNew: true },
      width: '500px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseService.createWarehouse(result).subscribe(() => {
          this.warehouses = this.loadWarehouses();
        });
      }
    });
  }

  public deleteWarehouse(warehouse: IWarehouse): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: warehouse,
      width: '600px',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.warehouseService.deleteWarehouse(warehouse.id).subscribe(() => {
          this.warehouses = this.loadWarehouses();
        });
      }
    });
  }
}
