import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../modules/user.class';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { FirebaseService } from '../firebase.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user: User = new User();
  userArr: User [] | null = [];
   
  constructor(public dialog: MatDialog, private firestoreService: FirebaseService) {
    this.firestoreService.getUserList().subscribe(userList =>{
      this.userArr = userList;
    })
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
