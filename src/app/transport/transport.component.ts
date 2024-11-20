import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

interface CartItem {
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
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
  ],
  styleUrls: ['./transport.component.css'],
})
export class TransportComponent {
  public deliveryForm: FormGroup;
  public cartItems: CartItem[] = [];
  public totalAmount = 0;
  public tabIndex = 0;

  public constructor(private fb: FormBuilder) {
    this.deliveryForm = this.fb.group({
      fromCity: ['', Validators.required],
      fromZip: ['', Validators.required],
      fromStreet: ['', Validators.required],
      fromHouseNumber: ['', Validators.required],
      toCity: ['', Validators.required],
      toZip: ['', Validators.required],
      toStreet: ['', Validators.required],
      toHouseNumber: ['', Validators.required],
    });
  }

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
    if (this.deliveryForm.valid) {
      const deliveryData = this.deliveryForm.value;
      console.log('Fuvarozás adatai', deliveryData);
    }
  }

  public deleteItem(item: object): void {
    console.log('Tárgy törlése:', item);
  }
}
