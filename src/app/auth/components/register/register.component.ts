import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', Validators.required],
        username: ['', [Validators.required, this.noSpacesValidator()]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            this.passwordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.matchPasswordsValidator('password', 'confirmPassword'),
      }
    );
  }

  registerForm!: FormGroup;
  registerData() {
    console.log(this.registerForm);
    if (this.registerForm.valid) {
      // Perform your login logic here
      console.log('Form Data:', this.registerForm.value);

      // Navigate to the root path
      this.router.navigate(['/']);
    }
  }
  noSpacesValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const hasSpaces = /\s/.test(control.value);
      return hasSpaces ? { noSpaces: true } : null;
    };
  }

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[@$!%*?&#]/.test(value);
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      return !valid ? { passwordStrength: true } : null;
    };
  }

  matchPasswordsValidator(
    password: string,
    confirmPassword: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(password);
      const confirmPasswordControl = control.get(confirmPassword);
      if (passwordControl && confirmPasswordControl) {
        const mismatch = passwordControl.value !== confirmPasswordControl.value;
        return mismatch ? { passwordMismatch: true } : null;
      }
      return null;
    };
  }
}
