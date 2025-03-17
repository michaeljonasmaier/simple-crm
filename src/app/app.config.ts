import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-3d61b","appId":"1:362696020972:web:a91b40dcfa89e24f5e66c9","storageBucket":"simple-crm-3d61b.firebasestorage.app","apiKey":"AIzaSyArBJcn9uPX80jN-OJ2hgpNXAk2z0eW6ko","authDomain":"simple-crm-3d61b.firebaseapp.com","messagingSenderId":"362696020972"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
