import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  public userForm: FormGroup;
  public companyForm: FormGroup;

  public constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      givenName: ['', Validators.required],
      surName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  public onSubmitUserForm(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;
      console.log('Felhasználói adatok:', userData.surName);
    }
  }

  public onSubmitCompanyForm(): void {
    if (this.companyForm.valid) {
      const companyData = this.companyForm.value;
      console.log('Cég adatai', companyData);
    }
  }
}
