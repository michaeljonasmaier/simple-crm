import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../modules/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, FormsModule, MatProgressBarModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent {

  user: User = new User();
  birthdate: Date = new Date();
  loading = false;

  constructor(private firestoreService: FirebaseService, public dialogRef: MatDialogRef<DialogAddUserComponent>) {

  }

  async saveUser() {
    this.user.birthDate = this.birthdate.getTime();
    console.log(this.user);
    this.loading = true;
    await this.firestoreService.addUser(this.user);
    this.loading = false;
    this.dialogRef.close();
  }
}
