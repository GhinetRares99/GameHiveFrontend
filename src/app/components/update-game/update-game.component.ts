import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateGameService } from '../../services/update-game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../models';
import { GetGameByNameService } from '../../services/get-game-by-name.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-game',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './update-game.component.html',
  styleUrl: './update-game.component.scss'
})
export class UpdateGameComponent {
  updateGameForm: FormGroup;
  game: Game | null | undefined;
  selectedFileOne: File | null = null;
  selectedFileTwo: File | null = null;
  selectedFileThree: File | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private updateGameService: UpdateGameService, private getGameByNameService: GetGameByNameService, private toastr: ToastrService) {
    this.updateGameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, Validators.min(0)],
      minimumSupportedOS: ['', Validators.required],
      minimumSupportedGraphicsCard: ['', Validators.required],
      minimumSupportedProcessor: ['', Validators.required],
      minimumSupportedMemory: ['', Validators.required],
      storage: ['', Validators.required],
      pictureOne: [this.game?.picOne],
      pictureTwo: [this.game?.picTwo],
      pictureThree: [this.game?.picThree],
    });
  }

  async ngOnInit(): Promise<void> {
    const gameName = this.route.snapshot.paramMap.get('gameName');
    const gameNameData = JSON.stringify({ name: gameName });

    try {
      const responseGame = await this.getGameByNameService.getGameByName(gameNameData);
      console.log(responseGame);

      this.game = responseGame;
    } catch (error) {
      console.error('Get-game-by-name error: ', error);
    }

    if(this.game){
      this.updateGameForm.patchValue({
        name: this.game.name,
        description: this.game.description,
        genre: this.game.genre,
        price: this.game.price,
        minimumSupportedOS: this.game.minimumSupportedOS,
        minimumSupportedGraphicsCard: this.game.minimumSupportedGraphicsCard,
        minimumSupportedProcessor: this.game.minimumSupportedProcessor,
        minimumSupportedMemory: this.game.minimumSupportedMemory,
        storage: this.game.storage
      });
    }
  }

  async onSubmit(){
    if (this.updateGameForm.valid) {
      const formData = this.updateGameForm.value;
      const newGameData: Game = {
        id: this.game?.id ?? '',
        name: '',
        description: '',
        genre: '',
        price: 0,
        minimumSupportedOS: '',
        minimumSupportedGraphicsCard: '',
        minimumSupportedProcessor: '',
        minimumSupportedMemory: '',
        storage: '',
        picOne: this.game?.picOne ?? '',
        picTwo: this.game?.picTwo ?? '',
        picThree: this.game?.picThree ?? ''
      };

      newGameData.name = formData.name;
      newGameData.description = formData.description;
      newGameData.genre = formData.genre;
      newGameData.price = formData.price;
      newGameData.minimumSupportedOS = formData.minimumSupportedOS;
      newGameData.minimumSupportedGraphicsCard = formData.minimumSupportedGraphicsCard;
      newGameData.minimumSupportedProcessor = formData.minimumSupportedProcessor;
      newGameData.minimumSupportedMemory = formData.minimumSupportedMemory;
      newGameData.storage = formData.storage;
      if (this.selectedFileOne) {
        newGameData.picOne = this.selectedFileOne.name;
      }
      if (this.selectedFileTwo) {
        newGameData.picTwo = this.selectedFileTwo.name;
      }
      if (this.selectedFileThree) {
        newGameData.picThree = this.selectedFileThree.name;
      }

      try {
        const response = await this.updateGameService.updateGame(newGameData);

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
        console.error('Update-game error: ', error);
      }
    }
    else
    {
      this.toastr.error("Invalid data!");
    }
  }

  onFileChangeOne(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFileOne = event.target.files[0];
    }
  }

  onFileChangeTwo(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFileTwo = event.target.files[0];
    }
  }

  onFileChangeThree(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFileThree = event.target.files[0];
    }
  }

  navigateToAdmin(){
    this.router.navigate(['/admin']);
  }
}
