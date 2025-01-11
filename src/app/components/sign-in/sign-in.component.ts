import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private signInService: SignInService) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.signInForm.valid) {
      const loginData = this.signInForm.value as JSON;

      try {
        const response = await this.signInService.signInUser(loginData);
        console.log(response.json());
        console.log('Token: ', response.headers.get("Authorization"));

        if(response.status == 200)
        { 
          const authorizationHeader = response.headers.get("Authorization");   
          if (authorizationHeader) {
            const token = authorizationHeader.split('Bearer ')[1];
            sessionStorage.setItem('authToken', token);

            const payloadBase64Url = token.split('.')[1];
            const payloadBase64 = payloadBase64Url.replace(/-/g, '+').replace(/_/g, '/');
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);

            sessionStorage.setItem('role', payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
          }

          this.router.navigate(['']);
        }
  
      } catch (error) {
        console.error('Sign-in error: ', error);
      }
    }
    else 
    {
      window.alert("Invalid data!");
    }
  }

  navigateToHome() {
    this.router.navigate(['']);
  }
}
