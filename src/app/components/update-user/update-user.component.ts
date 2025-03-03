import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserService } from '../../services/update-user.service';
import { GetUserService } from '../../services/get-user.service';
import { User } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {
  updateUserForm: FormGroup;
  selectedFile: File | null = null;
  user: User | null | undefined;
  userToken: string | null | undefined;
  initialEmail: string | undefined;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private fb: FormBuilder, private updateUserService: UpdateUserService, private getUserService: GetUserService, private toastr: ToastrService) {
    this.updateUserForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      countryOfResidence: ['', Validators.required],
      profilePic: [this.user?.profilePic]
    });
  }

  async ngOnInit(): Promise<void> {
    this.userToken = sessionStorage.getItem("authToken");

    if(this.userToken != null && this.userToken != undefined)
    {
       this.user = await this.getUserService.getUser();
    }

    if(this.user){
      this.initialEmail = this.user.email;
      this.updateUserForm.patchValue({
        email: this.user.email,
        username: this.user.username,
        countryOfResidence: this.user.countryOfResidence,
      });
    }
  }

  async onSubmit(){
    if (this.updateUserForm.valid) {
      const formData = this.updateUserForm.value;
      const currentEmail = this.updateUserForm.value.email;
      const newUserData: User = {
        id: this.user?.id ?? '',
        email: '',
        password: this.user?.password ?? '',
        username: '',
        countryOfResidence: '',
        role: this.user?.role ?? '',
        status: this.user?.status ?? '',
        activationToken: this.user?.activationToken ?? '',
        balance: this.user?.balance ?? 0,
        profilePic: this.user?.profilePic ?? '',
      };

      newUserData.email = formData.email;
      newUserData.username = formData.username;
      newUserData.countryOfResidence = formData.countryOfResidence;
      if (this.selectedFile) {
        newUserData.profilePic = this.selectedFile.name;
      }

      try {
        const response = await this.updateUserService.updateUser(newUserData);

        if(response.status == 200)
        {
          if (this.initialEmail !== currentEmail)
          {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("role");
            this.router.navigate(['']);
          }
          else
          {
            this.close.emit();
          }
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
        console.error('Update-user error: ', error);
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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }
}
