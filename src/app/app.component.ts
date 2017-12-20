import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

import { LoginPage } from './../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push, public alertCtr: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushsetup();
    });
  }
  pushsetup() {
    const options: PushOptions = {
      android: {
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      if (notification.additionalData.foreground) {
        let alertNoty = this.alertCtr.create({
          title: 'New Push notification',
          message: notification.message
        });
        alertNoty.present();
      }
    });

    pushObject.on('registration').subscribe((registration: any) => {
      //do whatever you want with the registration ID
      console.log(registration);
    });

    pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  }

}
