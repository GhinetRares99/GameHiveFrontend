import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SignUpService } from '../../services/sign-up.service';
import { User } from '../../models';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [MenuComponent, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private router: Router, private fb: FormBuilder, private signUpService: SignUpService) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', Validators.required],
      countryOfResidence: ['', Validators.required],
      profilePic: ['', Validators.required]
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value;
      const userData: User = {
        id: '',
        email: '',
        password: '',
        username: '',
        countryOfResidence: '',
        role: '',
        status: '',
        activationToken: '',
        balance: 0,
        profilePic: ''
      };

      userData.email = formData.email;
      userData.password = formData.password;
      userData.username = formData.username;
      userData.countryOfResidence = formData.countryOfResidence;
      if (this.selectedFile) {
        userData.profilePic = this.selectedFile.name;
      }

      try {
        const response = await this.signUpService.signUpUser(userData);
        console.log(response.json());

        if(response.status == 200)
        {
          this.router.navigate(['/after-sign-up']);
        }

      } catch (error) {
        console.error('Sign-up error: ', error);
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
