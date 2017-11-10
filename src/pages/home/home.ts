import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SearchProvider } from './../../providers/search/search';
import { CarProvider } from './../../providers/car/car';
import { DetailPage } from '../detail/detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public searchProvider: SearchProvider, public carProvider: CarProvider) {
    this.carProvider.getCar().subscribe(
      result => {
        let obj = result;
        console.log(JSON.parse(obj._body));
      },
      error => {
        console.log(error);
      }
    );
  }

  public itemClick(item) {
    this.navCtrl.push(DetailPage, item);
  }

}
