import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangePasswordService } from '../../services/change-password.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private router: Router, private fb: FormBuilder, private changePasswordService: ChangePasswordService, private toastr: ToastrService) {
    this.changePasswordForm = this.fb.group({
      newpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.changePasswordForm.valid) {
      const changePasswordData = this.changePasswordForm.value as JSON;

      try {
        const response = await this.changePasswordService.changePassword(changePasswordData);

        if(response.status == 200)
        {
          sessionStorage.removeItem("role");
          sessionStorage.removeItem("authToken");

          this.close.emit();
          this.router.navigate(['']);
        }

        if(response.status == 400)
        {
          const errorData = await response.json();
          if (Array.isArray(errorData)) {
            errorData.forEach((err: any) => {
              this.toastr.error(err.errorMessage);
            });
          }
        }

        if(response.status == 401 || response.status == 403)
        {
          this.router.navigate(['/signin']);
        }

      } catch (error) {
        console.error('Change-password error: ', error);
      }
    }
    else 
    {
      this.toastr.error("Invalid data!");
    }
  }

  onCancel() {
    this.close.emit();
  }
}
