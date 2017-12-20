import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

import { Bus } from '../../models/bus';
import { CarProvider } from '../../providers/car/car';
import { HomePage } from './../home/home';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  bus: Bus;
  viewMore: string = "phone";
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public carProvider: CarProvider, public navParams: NavParams, private callNumber: CallNumber, public toast: ToastController) {
    this.bus = this.navParams.get("item");
  }

  ionViewDidLoad() {
    console.log('detail page');
  }

  call(phoneNumber) {
    this.callNumber.callNumber(phoneNumber, true).then(() => {
      console.log('Launched dialer');
    }).catch(() => {
      console.log('error launched dialer');
    })
  }

  deleteBus() {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this bus?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.carProvider.deleteCar(this.navParams.get("item").$key);
            this.presentToast();
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  presentToast() {
    let toast = this.toast.create({
      message: 'Delete the bus successfully!',
      duration: 800,
      position: 'bottom'
    });
    toast.present();
  }

}
