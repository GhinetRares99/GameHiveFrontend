import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateUserService } from '../../services/update-user.service';
import { GetUserByUsernameService } from '../../services/get-user-by-username.service';
import { User } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user-admin',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-user-admin.component.html',
  styleUrl: './update-user-admin.component.scss'
})
export class UpdateUserAdminComponent {
  updateUserForm: FormGroup;
  user: User | null | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private updateUserService: UpdateUserService, private getUserByUsernameService: GetUserByUsernameService) {
    this.updateUserForm = this.fb.group({
      role: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    const userName = this.route.snapshot.paramMap.get('userName');
    const userNameData = JSON.stringify({ username: userName });

    try {
      const responseUser = await this.getUserByUsernameService.getUserByUsername(userNameData);
      console.log(responseUser);

      this.user = responseUser;
    } catch (error) {
      console.error('Get-user-by-username error: ', error);
    }

    if(this.user){
      this.updateUserForm.patchValue({
        role: this.user.role,
        status: this.user.status,
      });
    }
  }

  async onSubmit(){
    if (this.updateUserForm.valid) {
      const formData = this.updateUserForm.value;
      const newUserData: User = {
        id: this.user?.id ?? '',
        email: this.user?.email ?? '',
        password: this.user?.password ?? '',
        username: this.user?.username ?? '', 
        countryOfResidence: this.user?.countryOfResidence ?? '', 
        role:  '', 
        status:  '',
        activationToken: this.user?.activationToken ?? '',
        balance: this.user?.balance ?? 0,
        profilePic: this.user?.profilePic ?? '',
      };

      newUserData.role = formData.role;
      newUserData.status = formData.status;

      try {
        const response = await this.updateUserService.updateUser(newUserData);
        console.log(response.json());

        if(response.status == 200)
        {
          var token = sessionStorage.getItem("authToken") ?? '';

          const payloadBase64Url = token.split('.')[1];
          const payloadBase64 = payloadBase64Url?.replace(/-/g, '+').replace(/_/g, '/');
          const payloadJson = atob(payloadBase64);
          const payload = JSON.parse(payloadJson);

          if(this.user?.id === payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
          {
            sessionStorage.removeItem("authToken");
            sessionStorage.removeItem("role");
            this.router.navigate(['']);
          }
          else
          {
            this.router.navigate(['/admin']);
          }
        }

      } catch (error) {
        console.error('Update-user error: ', error);
      }
    }
    else
    {
      window.alert("Invalid data!");
    }
  }

  navigateToAdmin(){
    this.router.navigate(['/admin']);
  }
}
