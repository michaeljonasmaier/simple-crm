import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../modules/user.class';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading = false;

  user = new User();

   constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, public firebaseService: FirebaseService) {
  
    }

  async saveUser(){
    this.loading = true;
    await this.firebaseService.updateUser(this.user);
    this.loading = false;
    this.closeDialog();
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
