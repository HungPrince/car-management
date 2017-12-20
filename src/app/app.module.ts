import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { CallNumber } from '@ionic-native/call-number';
import { Push } from '@ionic-native/push';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { FilePath } from '@ionic-native/file-path';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { DetailPage } from '../pages/detail/detail';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ModalPage } from '../pages/modal/modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SearchProvider } from '../providers/search/search';
import { CarProvider } from '../providers/car/car';

export const firebaseConfig = {
  apiKey: "AIzaSyDat5dU7UHxU_WL7WGFwgn41aqv2BevsYE",
  authDomain: "car-management-c8d3a.firebaseapp.com",
  databaseURL: "https://car-management-c8d3a.firebaseio.com",
  projectId: "car-management-c8d3a",
  storageBucket: "car-management-c8d3a.appspot.com",
  messagingSenderId: "67005986792"
};

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AutoCompleteModule,
    FormsModule,
    HttpModule,
    AngularFireModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    DetailPage,
    TabsPage,
    LoginPage,
    RegisterPage,
    ModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CallNumber,
    CarProvider,
    Push,
    Camera,
    GoogleMaps,
    Geolocation,
    SearchProvider,
    FilePath
  ]
})
export class AppModule { }
