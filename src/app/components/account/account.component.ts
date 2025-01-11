import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Router } from '@angular/router';
import { GetUserService } from '../../services/get-user.service';
import { User } from '../../models';
import { DeleteUserService } from '../../services/delete-user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { CommonModule } from '@angular/common';
import { AddBalanceComponent } from "../add-balance/add-balance.component";
import { UpdateUserComponent } from "../update-user/update-user.component";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [MenuComponent, ChangePasswordComponent, CommonModule, AddBalanceComponent, UpdateUserComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  isChangePasswordVisible = false;
  isAddBalanceVisible = false;
  isUpdateUserVisible = false;
  user: User | null | undefined;
  userToken: string | null | undefined;

  constructor(private router: Router, private getUserService: GetUserService, private deleteUserService: DeleteUserService) {}

  async ngOnInit(): Promise<void> {
    this.userToken = sessionStorage.getItem("authToken");

    if(this.userToken != null && this.userToken != undefined)
    {
       this.user = await this.getUserService.getUser();
    }
  }

  async deleteUser()
  {
    try {
      const response = await this.deleteUserService.deleteUser();
      console.log(response);

      this.user = null;
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("authToken");

      this.router.navigate(['']);
    } catch (error) {
      console.error('Delete-user error: ', error);
    }
  }

  showChangePassword() {
    this.isChangePasswordVisible = true;
  }

  closeChangePassword() {
    this.isChangePasswordVisible = false;
  }

  showAddBalance() {
    this.isAddBalanceVisible = true;
  }

  closeAddBalance() {
    this.isAddBalanceVisible = false;
  }

  showUpdateUser() {
    this.isUpdateUserVisible = true;
  }

  closeUpdateUser() {
    this.isUpdateUserVisible = false;
  }
}
