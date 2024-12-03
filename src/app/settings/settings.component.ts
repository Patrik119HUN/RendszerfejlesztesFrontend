import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { SettingsService } from './service/settings.service';
import { ISettings } from '../shared/model/settings';
import {MatOption, MatSelect} from "@angular/material/select";


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSelect,
    MatOption
  ],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public userForm: FormGroup;
  public companyForm: FormGroup;
  public userSaveSuccess=false;
  public companySaveSuccess=false;
  public companies: ISettings['company'][] = [];
  public selectedCompanyId: number | null = null;

  public constructor(private fb: FormBuilder, private settingsService: SettingsService) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.companyForm = this.fb.group({
      id: [null], // Cég ID, ha létezik
      name: ['', Validators.required],
      headquarter_address: this.fb.group({
        country: ['', Validators.required],
        province: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        number: [null, Validators.required],
        postalCode: [null, Validators.required]
      })
    });
  }

  public onSubmitUserForm(): void {
    if (this.userForm.valid) {
      const userData: ISettings['user'] = this.userForm.value;
      this.settingsService.saveUserData(userData).subscribe(() => {
        console.log('Felhasználói adat elmentve: ', userData);
        this.userSaveSuccess=true;
      });
    }
  }

  public onSubmitCompanyForm(): void {
    if (this.companyForm.valid) {
      const companyData: ISettings['company'] = this.companyForm.value;
      this.settingsService.saveCompanyData(companyData).subscribe(() => {
        console.log('Cég adatai elmentve: ', companyData);
        this.companySaveSuccess=true;
      });
    }
  }

  public ngOnInit(): void {
    this.settingsService.getCompanyData().subscribe((companies) => {
      this.companies = companies;
    });
  }

  onSelectCompany(companyId: number): void {
    this.selectedCompanyId = companyId;
    const selectedCompany = this.companies.find((c) => c.id === companyId);

    if (selectedCompany) {
      this.companyForm.patchValue(selectedCompany);
    }
  }
}
