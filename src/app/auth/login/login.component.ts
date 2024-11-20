import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup<LoginForm>;

  public constructor(private readonly auth: AuthService, private readonly router: Router) {
    this.loginForm = new FormGroup<LoginForm>({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  public onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.email?.value;
    const password = this.password?.value;
    this.auth.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/warehouse']);
      },
      error: () => {
        alert('Invalid email or password');
      },
    });
  }

  public get email(): AbstractControl<string, string> {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl<string, string> {
    return this.loginForm.get('password');
  }
}
