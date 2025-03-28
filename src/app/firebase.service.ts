import { inject, Injectable } from '@angular/core';
import { User } from '../modules/user.class';
import { addDoc, collection, doc, Firestore, getDoc, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firestore: Firestore = inject(Firestore);

  private userListSubject = new BehaviorSubject<User[] | null>(null);
  userList$ = this.userListSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

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

  async addUser(user: User){
    let userRef = await addDoc(collection(this.firestore, 'users'), this.setUserObj(user));
    await setDoc(userRef, { id: userRef.id }, { merge: true });
  }
  
  getUserList(){
    return this.userList$;
  }

  subUser(id: string) {
    const userRef = doc(this.firestore, 'users', id);
  
    return onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        const userData = { ...(docSnap.data() as User) }; 
        this.userSubject.next(userData);
      } else {
        console.warn("User existiert nicht oder hat keine Daten!");
      }
    });
  }

  async updateUser(newUser: User){
    let userRef = doc(collection(this.firestore, 'users'), newUser.id);
    console.log(userRef)
    console.log(newUser)
    await updateDoc(userRef, { ...newUser});
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
