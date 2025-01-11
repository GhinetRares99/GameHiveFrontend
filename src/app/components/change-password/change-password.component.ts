import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from '../../services/change-password.service';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private fb: FormBuilder, private changePasswordService: ChangePasswordService) {
    this.changePasswordForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.changePasswordForm.valid) {
      const changePasswordData = this.changePasswordForm.value as JSON;

      try {
        const response = await this.changePasswordService.changePassword(changePasswordData);
        console.log(response.json());

        if(response.status == 200)
        {
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("authToken");

          this.close.emit();
          this.router.navigate(['']);
        }

      } catch (error) {
        console.error('Change-password error: ', error);
      }
    }
    else 
    {
      window.alert("Invalid data!");
    }
  }

  onCancel() {
    this.close.emit();
  }
}
