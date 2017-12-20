import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public storage: Storage, public navCtrl: NavController) {
    this.storage.get("user").then((data) => {
      if (!data) {
        this.navCtrl.push(LoginPage);
      }
      console.log("Success");
    });
  }
}
