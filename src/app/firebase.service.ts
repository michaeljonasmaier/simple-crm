import { inject, Injectable } from '@angular/core';
import { User } from '../modules/user.class';
import { addDoc, collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  private userListSubject = new BehaviorSubject<User[] | null>(null);
  userList$ = this.userListSubject.asObservable();

  constructor() { 
    this.subUserList();
  }

  subUserList() {
    onSnapshot(collection(this.firestore, 'users'), (userList) => {
      let userListRef: User[] = [];
      userList.forEach(userItem => {
        userListRef.push(this.setUserObj(userItem.data()));
      });
      this.userListSubject.next(userListRef);
      console.log(this.userList$);
    })
  }

  addUser(user: User){
    addDoc(collection(this.firestore, 'users'), this.setUserObj(user)).then((result: any) => {
      console.log('adding user finished: ', result);
      
    })
  }
  

  getUserList(){
    return this.userList$;
  }

  setUserObj(obj: any): User {
    return {
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      birthDate: obj.birthDate || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
    }
  }
}
