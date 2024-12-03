import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { IProduct } from '../../shared/model/product';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { distinctUntilChanged, map, Observable, startWith, tap, throttleTime } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IProductWithQuantity } from '../../shared/model/product-with-quantity';
import {ItemService} from "../../shared/services/item.service";

export interface IAddProductToWarehouseResult {
  id?: number;
  item: IProduct;
  quantity: number;
}

interface IAddProductToWarehouseForm {
  name: FormControl<string>;
  quantity: FormControl<number>;
}

@Component({
  selector: 'app-add-item-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatAutocompleteModule,
    MatOption,
    AsyncPipe,
  ],
  templateUrl: './add-item-dialog.component.html',
})
export class AddProductDialogComponent implements OnInit {
  public productForm: FormGroup;
  public items: IProduct[] = [];
  public filteredProducts$: Observable<IProduct[]>;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: IProductWithQuantity; isNew: boolean },
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private readonly itemService: ItemService
  ) {
    this.itemService
      .getAllItems()
      .pipe(tap((items) => (this.items = items)))
      .subscribe();

    this.productForm = new FormGroup<IAddProductToWarehouseForm>({
      name: new FormControl(data.product?.item.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      quantity: new FormControl(data.product?.quantity || 0, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  public ngOnInit(): void {
    this.filteredProducts$ = this.name.valueChanges.pipe(
      throttleTime(1000),
      startWith(''),
      map((value) => this._filter(value)),
      distinctUntilChanged()
    );
  }

  private _filter(value: string): IProduct[] {
    const filterValue = value.toLowerCase();
    return this.items.filter((option) => option.name.toLowerCase().includes(filterValue));
  }

  private _getProductByName(name: string): IProduct {
    return this.items.find((item) => item.name === name);
  }

  public onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }

    const product = {
      id: this.data.product?.id,
      item: this._getProductByName(this.name.value),
      quantity: this.quantity.value,
    } as IAddProductToWarehouseResult;

    this.dialogRef.close(product);
  }

  public get name(): AbstractControl<string, string> {
    return this.productForm.get('name');
  }

  public get quantity(): AbstractControl<number, number> {
    return this.productForm.get('quantity');
  }
}
