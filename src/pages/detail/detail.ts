import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  viewMore: string = "phone";
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber) {
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

}
