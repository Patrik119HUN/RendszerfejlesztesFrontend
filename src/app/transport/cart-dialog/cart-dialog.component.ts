import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { IProductWithQuantity } from '../../shared/model/product-with-quantity';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartItem } from '../transport.component';

@Component({
  selector: 'app-cart-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule, MatDialogContent, FormsModule],
  templateUrl: './cart-dialog.component.html',
})
export class CartDialogComponent {
  public items: IProductWithQuantity[];
  public cartItems: CartItem[] = [];

  public constructor(
    public dialogRef: MatDialogRef<CartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: IProductWithQuantity[] }
  ) {
    this.items = data.items;
  }

  public productToCart(product: IProductWithQuantity): void {
    this.cartItems.push({
      id: product.item.id,
      name: product.item.name,
      quantity: product.quantity,
      price: product.item.price,
    });
  }

  public closeDialog(): void {
    this.dialogRef.close(this.cartItems);
  }
}
