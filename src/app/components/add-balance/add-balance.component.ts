import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateUserService } from '../../services/update-user.service';
import { GetUserService } from '../../services/get-user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-balance',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-balance.component.html',
  styleUrl: './add-balance.component.scss'
})
export class AddBalanceComponent {
  addBalanceForm: FormGroup;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private fb: FormBuilder, private updateUserService: UpdateUserService, private getUserService: GetUserService, private toastr: ToastrService) {
    this.addBalanceForm = this.fb.group({
      cardnumber: ['', [Validators.required, Validators.pattern('\\d{4} \\d{4} \\d{4} \\d{4}')]],
      cardholder: ['', [Validators.required, Validators.minLength(3)]],
      expirydate: ['', [Validators.required, Validators.pattern('\\d{2}/\\d{2}')]],
      cvv: ['', [Validators.required, Validators.pattern('\\d{3}')]],
      amount: ['', [Validators.required, Validators.min(1)]]
    });
  }

  async onSubmit(){
    if (this.addBalanceForm.valid) {
      const formData = this.addBalanceForm.value;
      var user = await this.getUserService.getUser();
      user.balance = user.balance + formData.amount;

      const response = await this.updateUserService.updateUser(user);
      console.log(response.json());

      if(response.status == 200)
      {
        this.close.emit();
      }

      if(response.status == 401 || response.status == 403)
      {
        this.router.navigate(['/signin']);
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
