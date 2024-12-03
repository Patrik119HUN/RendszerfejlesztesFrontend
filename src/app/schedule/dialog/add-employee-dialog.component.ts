import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { IEmployee } from '../../shared/model/employee';
import {MatButton} from "@angular/material/button";

interface IEmployeeForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  role: FormControl<string | string[]>;
}

@Component({
  selector: 'app-add-employee-dialog',
  templateUrl: './add-employee-dialog.component.html',
  standalone: true,
  imports: [
    MatInputModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ]
})
export class AddEmployeeDialogComponent {
  public employeeForm: FormGroup<IEmployeeForm>;

  public constructor(
    @Inject(MAT_DIALOG_DATA) public data: { employee: IEmployee; isNew: boolean },
    protected dialogRef: MatDialogRef<AddEmployeeDialogComponent>
  ) {
    this.employeeForm = new FormGroup<IEmployeeForm>({
      firstName: new FormControl(data.employee?.firstName || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(data.employee?.lastName || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(data.employee?.email || '', [Validators.required, Validators.email]),
      role: new FormControl(data.employee?.role || '', Validators.required),
    });
  }

  public onSubmit(): void {
    if (!this.employeeForm.valid) {
      return;
    }

    const employee = {
      id: this.data.employee?.id || 0,
      firstName: this.employeeForm.get('firstName')?.value,
      lastName: this.employeeForm.get('lastName')?.value,
      email: this.employeeForm.get('email')?.value,
      role: this.employeeForm.get('role')?.value,
    } as IEmployee;

    this.dialogRef.close(employee);
  }
}
