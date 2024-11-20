import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, ICompanyRegisterRequest } from '../../shared/services/auth.service';

interface ICompanyRegisterForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  companyName: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
  street: FormControl<string>;
  houseNumber: FormControl<string>;
}

@Component({
  selector: 'app-registercompany',
  standalone: true,
  imports: [MatButton, MatFormField, MatInput, MatError, MatLabel, ReactiveFormsModule],
  templateUrl: './registercompany.component.html',
  styleUrl: './registercompany.component.css',
})
export class RegistercompanyComponent {
  public registerForm: FormGroup;

  public constructor(private readonly authService: AuthService) {
    this.registerForm = new FormGroup<ICompanyRegisterForm>({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      companyName: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      houseNumber: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      alert('Hiba történt a regisztráció során!');
    }
    const companyDetails = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value,
      companyName: this.companyName?.value,
      postalCode: this.postalCode?.value,
      city: this.city?.value,
      street: this.street?.value,
      houseNumber: this.houseNumber?.value,
      requestType: 'company',
    } as ICompanyRegisterRequest;

    this.authService.register(companyDetails).subscribe({
      next: () => {
        console.log(companyDetails);
      },
      error: () => {
        alert('Hiba történt a regisztráció során!');
      },
    });
  }

  public get firstName(): AbstractControl<string, string> {
    return this.registerForm.get('firstName');
  }

  public get lastName(): AbstractControl<string, string> {
    return this.registerForm.get('lastName');
  }

  public get email(): AbstractControl<string, string> {
    return this.registerForm.get('email');
  }

  public get password(): AbstractControl<string, string> {
    return this.registerForm.get('password');
  }

  public get companyName(): AbstractControl<string, string> {
    return this.registerForm.get('companyName');
  }

  public get postalCode(): AbstractControl<string, string> {
    return this.registerForm.get('postalCode');
  }

  public get city(): AbstractControl<string, string> {
    return this.registerForm.get('city');
  }

  public get street(): AbstractControl<string, string> {
    return this.registerForm.get('street');
  }

  public get houseNumber(): AbstractControl<string, string> {
    return this.registerForm.get('houseNumber');
  }
}
