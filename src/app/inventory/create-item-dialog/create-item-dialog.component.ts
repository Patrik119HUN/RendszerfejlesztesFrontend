import { Component, Inject } from '@angular/core';
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
import { MatAutocompleteModule } from '@angular/material/autocomplete';

interface IProductForm {
  name: FormControl<string>;
  price: FormControl<number>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-create-item-dialog',
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
  ],
  templateUrl: './create-item-dialog.component.html',
})
export class CreateProductDialogComponent {
  public productForm: FormGroup;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: IProduct; isNew: boolean },
    private dialogRef: MatDialogRef<CreateProductDialogComponent>
  ) {
    this.productForm = new FormGroup<IProductForm>({
      name: new FormControl(data.product?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      price: new FormControl(data.product?.price || 0, [Validators.required, Validators.min(0)]),
      description: new FormControl(data.product?.description || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  public onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }

    const product = {
      id: this.data.product?.id || 0,
      name: this.name.value,
      price: this.price.value,
      description: this.description.value,
    } as IProduct;

    this.dialogRef.close(product);
  }

  public get name(): AbstractControl<string, string> {
    return this.productForm.get('name');
  }

  public get price(): AbstractControl<number, number> {
    return this.productForm.get('price');
  }

  public get description(): AbstractControl<string, string> {
    return this.productForm.get('description');
  }
}
