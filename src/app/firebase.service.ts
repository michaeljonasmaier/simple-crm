import { inject, Injectable } from '@angular/core';
import { User } from '../modules/user.class';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot } from '@angular/fire/firestore';
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
        userListRef.push(this.setUserObj(userItem.data(), userItem.id));
      });
      this.userListSubject.next(userListRef);
    })
  }

  addUser(user: User){
    addDoc(collection(this.firestore, 'users'), this.setUserObj(user)).then((result: any) => {
    })
  }
  
  getUserList(){
    return this.userList$;
  }

  async getUser(id: string){
    let userRef = doc(collection(this.firestore, 'users'), id);
    let userSnap = await getDoc(userRef);
    let userData: User = this.setUserObj(userSnap.data(), userSnap.id);
    return userData
    
  }

  setUserObj(obj: any, objID?: string): User {
    return {
      firstName: obj.firstName || "",
      lastName: obj.lastName || "",
      email: obj.email || "",
      birthDate: obj.birthDate || "",
      street: obj.street || "",
      zipCode: obj.zipCode || "",
      city: obj.city || "",
      id: objID || "",
    }
  }
}
