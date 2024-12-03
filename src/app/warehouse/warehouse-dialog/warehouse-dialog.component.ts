import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import { IWarehouse } from '../../shared/model/warehouse';

@Component({
  selector: 'app-warehouse-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './warehouse-dialog.component.html'
})
export class WarehouseDialogComponent {
  public warehouseForm: FormGroup;
  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { warehouse: IWarehouse; isNew: boolean },
    private dialogRef: MatDialogRef<WarehouseDialogComponent>,
    private fb: FormBuilder
  ) {
    this.warehouseForm = this.fb.group({
      name: [data.warehouse?.name || '', Validators.required],
      capacity: [data.warehouse?.capacity || '', [Validators.required, Validators.min(1)]],
      country: [data.warehouse?.address?.country || '', Validators.required],
      province: [data.warehouse?.address?.province || '', Validators.required],
      city: [data.warehouse?.address?.city || '', Validators.required],
      street: [data.warehouse?.address?.street || '', Validators.required],
      number: [data.warehouse?.address?.number || '', [Validators.required, Validators.min(1)]],
      postalCode: [data.warehouse?.address?.postalCode || '', [Validators.required, Validators.min(1000), Validators.max(9999)]]
    });
  }

  public onSubmit(): void {
    if (this.warehouseForm.valid) {
      const formData = this.warehouseForm.value;
      const warehouse: IWarehouse = {
        id: this.data.warehouse?.id || 0,
        name: formData.name,
        capacity: formData.capacity,
        items: [],
        address: {
          id: this.data.warehouse?.address?.id || 0,
          country: formData.country,
          province: formData.province,
          city: formData.city,
          street: formData.street,
          number: formData.number,
          postalCode: formData.postalCode
        },
        employees: []
      };

      this.dialogRef.close(warehouse);
    }
  }
}
