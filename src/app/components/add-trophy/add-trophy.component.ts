import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddTrophyService } from '../../services/add-trophy.service';
import { Router } from '@angular/router';
import { Trophy } from '../../models';

@Component({
  selector: 'app-add-trophy',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-trophy.component.html',
  styleUrl: './add-trophy.component.scss'
})
export class AddTrophyComponent {
  addTrophyForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private router: Router, private fb: FormBuilder, private addTrophyService: AddTrophyService) {
    this.addTrophyForm = this.fb.group({
      gameId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      iconUrl: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  navigateToAdmin(){
    this.router.navigate(['/admin']);
  }

  async onSubmit() {
    if (this.addTrophyForm.valid) {
      const formData = this.addTrophyForm.value;
      const trophyData: Trophy = {
        id: '',
        gameId: '',
        name: '',
        description: '',
        iconUrl: ''
      }

      trophyData.gameId = formData.gameId;
      trophyData.name = formData.name;
      trophyData.description = formData.description;
      if (this.selectedFile) {
        trophyData.iconUrl = this.selectedFile.name;
      }

      try {
        const response = await this.addTrophyService.addTrophy(trophyData);
        console.log(response.json());

        if(response.status == 200)
        {
          this.router.navigate(['/admin']);
        }

      } catch (error) {
        console.error('Add-trophy error: ', error);
      }

    }
    else
    {
      window.alert("Invalid data!");
    }
  }
}
