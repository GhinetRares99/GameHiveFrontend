import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Trophy } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateTrophyService } from '../../services/update-trophy.service';
import { GetTrophyByNameService } from '../../services/get-trophy-by-name.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-trophy',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-trophy.component.html',
  styleUrl: './update-trophy.component.scss'
})
export class UpdateTrophyComponent {
  updateTrophyForm: FormGroup;
  trophy: Trophy | null | undefined;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private updateTrophyService: UpdateTrophyService, private getTrophyByNameService: GetTrophyByNameService, private toastr: ToastrService) {
    this.updateTrophyForm = this.fb.group({
      gameId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      pictureOne: [this.trophy?.iconUrl],
    });
  }

  async ngOnInit(): Promise<void> {
    const trophyName = this.route.snapshot.paramMap.get('trophyName');
    const trophyNameData = JSON.stringify({ name: trophyName });

    try {
      const responseTrophy = await this.getTrophyByNameService.getTrophyByName(trophyNameData);
      console.log(responseTrophy);

      this.trophy = responseTrophy;
    } catch (error) {
      console.error('Get-trophy-by-name error: ', error);
    }

    if(this.trophy){
      this.updateTrophyForm.patchValue({
        gameId: this.trophy.gameId,
        name: this.trophy.name,
        description: this.trophy.description,
      });
    }
  }

  async onSubmit(){
    if (this.updateTrophyForm.valid) {
      const formData = this.updateTrophyForm.value;
      const newTrophyData: Trophy = {
        id: this.trophy?.id ?? '',
        gameId: '',
        name: '',
        description: '',  
        iconUrl: this.trophy?.iconUrl ?? '',
      };

      newTrophyData.gameId = formData.gameId;
      newTrophyData.name = formData.name;
      newTrophyData.description = formData.description;
      if (this.selectedFile) {
        newTrophyData.iconUrl = this.selectedFile.name;
      }

      try {
        const response = await this.updateTrophyService.updateTrophy(newTrophyData);

        if(response.status == 200)
        {
          this.router.navigate(['/admin']);
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
        console.error('Update-trophy error: ', error);
      }
    }
    else
    {
      this.toastr.error("Invalid data!");
    }
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  navigateToAdmin(){
    this.router.navigate(['/admin']);
  }
}
