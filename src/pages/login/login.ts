/**
 * Created by HungPrince on 17-Jul-17.
 */
import { Component } from '@angular/core';
import { AlertController, NavController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


import { User } from "../../models/user";

import { LoaderService } from '../../services/loader';

import { HomePage } from './../home/home';
import { RegisterPage } from './../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['E:/Study/FinalYear/car-management/src/pages/login/login.css']
})
export class LoginPage extends LoaderService {

  private message: string;
  private classError: boolean;
  private submitted = false;
  private user: User;
  constructor(public navCtrl: NavController, private storage: Storage, private afAuth: AngularFireAuth, private alertCtrl: AlertController, public loadingCtr: LoadingController) {
    super(loadingCtr = loadingCtr);
    this.storage.get('user').then((data) => {
      if (data && data.email) {
        console.log(data);
        this.navCtrl.push(HomePage);
      }
    });
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
      var result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.navCtrl.push(HomePage);
      }
    } catch (error) {
      console.log(error);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
