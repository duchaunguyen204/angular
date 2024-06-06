import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';


import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.minLength(6),
      Validators.required,
    ]),
  });


  constructor(private router: Router) {}
  handleSubmit() {
    // console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert("Dang Ky Thanh cong ")
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error.status === 409) { // assuming 409 Conflict status for existing user
          alert("This email is already registered. Please use a different email.");
        } else {
          alert("An error occurred during registration. Please try again.");
        }
        console.error(error.message);
        console.error(error.message);
      },
    });
  }
}