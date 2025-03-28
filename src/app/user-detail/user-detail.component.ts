import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { User } from '../../modules/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIcon, MatIconButton, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId: string = "";
  user: User | null = null;

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService, public dialog: MatDialog){

  }

  async ngOnInit(){
     this.route.paramMap.subscribe( paramMap => {
      this.userId = paramMap.get('id') || '';
     
      
    });
    if (this.userId) {
      this.getUser();
   }
  }

  async getUser(){
    await this.firebaseService.subUser(this.userId);
      await this.firebaseService.user$.subscribe(user => {
       this.user = user!; // 🔥 Aktualisiert sich automatisch bei Änderungen
     });
  }

  editMenu(){
    let dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.user);
  }

  editUserDetail(){
    let dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user =  new User(this.user);
  }
}
