import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { CartDialogComponent } from './cart-dialog/cart-dialog.component';
import { AsyncPipe } from '@angular/common';
import { MatOption } from '@angular/material/autocomplete';
import { map, Observable, tap } from 'rxjs';
import { IWarehouse } from '../shared/model/warehouse';
import { WarehouseService } from '../shared/services/warehouse.service';
import { MatSelectModule } from '@angular/material/select';
import { ITransport, TransportService } from './services/transport.service';

export interface CartItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    AsyncPipe,
    MatOption,
  ],
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent implements OnInit {
  public deliveryForm: FormGroup;
  public cartItems: CartItem[] = [];
  public totalAmount = 0;
  public tabIndex = 0;

  public userWarehouses$: Observable<IWarehouse[]>; // Felhasználó raktárai

  public constructor(
    private readonly dialog: MatDialog,
    private readonly warehouseService: WarehouseService,
    private readonly transportService: TransportService
  ) {
    this.deliveryForm = new FormGroup({
      fromWarehouse: new FormControl(0, [Validators.required]),
      toWarehouse: new FormControl(0, [Validators.required]),
    });

    this.userWarehouses$ = this.warehouseService.getUserWarehouses();
  }

  public ngOnInit(): void {}

  public goBack(): void {
    if (this.tabIndex > 0) {
      this.tabIndex--;
    }
  }

  public nextPage(): void {
    if (this.tabIndex < 2) {
      this.tabIndex++;
    }
  }

  public onDeliverySubmit(): void {
    const fromWarehouseId = this.fromWarehouse?.value;
    const toWarehouseId = this.toWarehouse?.value;

    const delivery = {
      fromWarehouseId,
      toWarehouseId,
      items: this.cartItems.map((item) => ({ itemId: item.id, quantity: item.quantity })),
    } as ITransport;

    this.transportService.transportItems(delivery).subscribe(() => {
      alert('Szállítás sikeresen megtörtént!');
    });
  }

  public deleteItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem !== item);
    this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  public openAddShipmentDialog(): void {
    const fromWarehouseId = this.fromWarehouse?.value;

    if (!fromWarehouseId) {
      alert('Küldő telephely ID nincs megadva.');
      return;
    }

    const warehouse$ = this.warehouseService
      .getWarehouseById(fromWarehouseId)
      .pipe(map((warehouse) => warehouse.items));

    warehouse$
      .pipe(
        tap((items) => {
          this.dialog
            .open(CartDialogComponent, {
              data: { items: items },
              width: '500px',
            })
            .afterClosed()
            .subscribe((newProducts: CartItem[]) => {
              if (newProducts && newProducts.length > 0) {
                this.cartItems.push(...newProducts);
                this.totalAmount += newProducts.reduce(
                  (sum, item) => sum + item.quantity * item.price,
                  0
                );
              }
            });
        })
      )
      .subscribe();
  }

  public get fromWarehouse(): AbstractControl<number, number> {
    return this.deliveryForm.get('fromWarehouse');
  }

  public get toWarehouse(): AbstractControl<number, number> {
    return this.deliveryForm.get('toWarehouse');
  }
}
