import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService, IUserRegisterRequest } from '../../shared/services/auth.service';

interface IRegisterForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public registerForm: FormGroup;

  public constructor(private readonly authService: AuthService) {
    this.registerForm = new FormGroup<IRegisterForm>({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (!this.registerForm.valid) {
      alert('Hiba történt a regisztráció során!');
    }

    const userDetails = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value,
      requestType: 'user',
    } as IUserRegisterRequest;

    this.authService.register(userDetails).subscribe({
      next: () => {
        console.log(userDetails);
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
}
