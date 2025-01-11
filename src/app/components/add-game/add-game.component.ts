import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddGameService } from '../../services/add-game.service';
import { CommonModule } from '@angular/common';
import { Game } from '../../models';

@Component({
  selector: 'app-add-game',
  standalone: true,
  imports: [MenuComponent, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-game.component.html',
  styleUrl: './add-game.component.scss'
})
export class AddGameComponent {
  addGameForm: FormGroup;
  selectedFileOne: File | null = null;
  selectedFileTwo: File | null = null;
  selectedFileThree: File | null = null;

  constructor(private router: Router, private fb: FormBuilder, private addGameService: AddGameService) {
    this.addGameForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      price: [0, Validators.min(0)],
      minimumSupportedOS: ['', Validators.required],
      minimumSupportedGraphicsCard: ['', Validators.required],
      minimumSupportedProcessor: ['', Validators.required],
      minimumSupportedMemory: ['', Validators.required],
      storage: ['', Validators.required],
      pictureOne: ['', Validators.required],
      pictureTwo: ['', Validators.required],
      pictureThree: ['', Validators.required],
    });
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

  async onSubmit() {
    if (this.addGameForm.valid) {
      const formData = this.addGameForm.value;
      const gameData: Game = {
        id: '',
        name: '',
        description: '',
        genre: '',
        price: 0,
        minimumSupportedOS: '',
        minimumSupportedGraphicsCard: '',
        minimumSupportedProcessor: '',
        minimumSupportedMemory: '',
        storage: '',
        picOne: '',
        picTwo: '',
        picThree: '',
      }

      gameData.name = formData.name;
      gameData.description = formData.description;
      gameData.genre = formData.genre;
      gameData.price = formData.price;
      gameData.minimumSupportedOS = formData.minimumSupportedOS;
      gameData.minimumSupportedGraphicsCard = formData.minimumSupportedGraphicsCard;
      gameData.minimumSupportedProcessor = formData.minimumSupportedProcessor;
      gameData.minimumSupportedMemory = formData.minimumSupportedMemory;
      gameData.storage = formData.storage;
      if (this.selectedFileOne) {
        gameData.picOne = this.selectedFileOne.name;
      }
      if (this.selectedFileTwo) {
        gameData.picTwo = this.selectedFileTwo.name;
      }
      if (this.selectedFileThree) {
        gameData.picThree = this.selectedFileThree.name;
      }

      try {
        const response = await this.addGameService.addGame(gameData);
        console.log(response.json());

        if(response.status == 200)
        {
          this.router.navigate(['/admin']);
        }

      } catch (error) {
        console.error('Add-game error: ', error);
      }
    }
    else 
    {
      window.alert("Invalid data!");
    }
  }

}
