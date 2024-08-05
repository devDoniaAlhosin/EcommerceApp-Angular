import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

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
        addresses: this.fb.array([], this.addressesValidator()),
      },
      {
        validators: this.matchPasswordsValidator('password', 'confirmPassword'),
      }
    );

    this.addAddress();
  }

  get addresses(): FormArray {
    return this.registerForm.get('addresses') as FormArray;
  }

  registerData() {
    if (this.registerForm.valid) {
      console.log('Form Data:', this.registerForm.value);
      this.router.navigate(['/']);
    }
  }

  addAddress() {
    const addressGroup = this.fb.group({
      address: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)],
      ],
      street: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)],
      ],
      country: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      city: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
    });
    this.addresses.push(addressGroup);
  }

  removeAddress(index: number) {
    this.addresses.removeAt(index);
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

  addressesValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const addresses = formArray as FormArray;
      for (const address of addresses.controls) {
        if (address instanceof FormGroup) {
          if (address.invalid) {
            return { invalidAddress: true };
          }
        }
      }
      return null;
    };
  }
}
