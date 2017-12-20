import { CarProvider } from './../../providers/car/car';
import { Database } from './../../db/database';
/**
 * Created by HungPrince on 17-Jul-17.
 */
import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'

import * as firebase from 'firebase/app';


import { User } from "../../models/user";

import { LoaderService } from '../../services/loader';

import { TabsPage } from './../tabs/tabs';
import { RegisterPage } from './../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['E:/Study/FinalYear/car-management/src/pages/login/login.css']
})
export class LoginPage extends LoaderService {

  private message: string = '';
  private classError: boolean;
  private submitted = false;
  private user: User;
  constructor(public navCtrl: NavController,
    private storage: Storage,
    private afAuth: AngularFireAuth,
    private alertCtrl: AlertController, public loadingCtr: LoadingController, public database: AngularFireDatabase, public carProvider: CarProvider) {
    super(loadingCtr = loadingCtr);
    let listBus = this.carProvider.getCar().subscribe(x => console.log(x));
    this.storage.get('user').then((data) => {
      if (data) {
        console.log(data);
        this.navCtrl.push(TabsPage);
      }
    });
  }

  ngAfterViewInit() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
  }

  login(user) {
    this.submitted = true;
    this.loader('Sign in ..', 500);
    if (user.email) {
      user.email = user.email.trim();
    }
    if (user.password) {
      user.password = user.password.trim();
    }
    try {
      var result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(
        success => {
          this.storage.set("user", success.email);
          this.navCtrl.push(TabsPage);
        },
        error => {
          this.message = error.message;
        })
    } catch (error) {
      console.log(error);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
