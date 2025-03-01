import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletePossessionService } from '../../services/delete-possession.service';

@Component({
  selector: 'app-remove-possession-popup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './remove-possession-popup.component.html',
  styleUrl: './remove-possession-popup.component.scss'
})
export class RemovePossessionPopupComponent {
  @Input() gameId!: string;
  @Input() userId!: string;
  @Output() close = new EventEmitter<void>();

  constructor(private deletePossessionService: DeletePossessionService) {
  }

  async proceed(){
    try {
      const data = JSON.stringify({
        gameId: this.gameId,
        userId: this.userId
      });

      const response = await this.deletePossessionService.deletePossession(data);

      if(response.status == 200)
      {
        this.close.emit();
      }
    } catch (error) {
      console.error('Delete-possession error: ', error);
    }
  }

  onCancel() {
    this.close.emit();
  }
}
