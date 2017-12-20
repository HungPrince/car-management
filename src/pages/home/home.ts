import { Component } from '@angular/core';
import { NavController, ModalController, Modal, ModalOptions, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SearchProvider } from './../../providers/search/search';
import { CarProvider } from './../../providers/car/car';
import { DetailPage } from '../detail/detail';
import { ModalPage } from '../modal/modal';
import { LoginPage } from '../login/login';
import { Bus } from './../../models/bus';
import { LoaderService } from '../../services/loader';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends LoaderService {

  bus: Bus;
  listBus: any;
  listBusDefault: any;
  base64Image: any;

  constructor(public navCtrl: NavController, public loadingCtr: LoadingController, public modalCtr: ModalController, public searchProvider: SearchProvider, public carProvider: CarProvider, public storage: Storage, public camera: Camera) {
    super(loadingCtr = loadingCtr);
    this.loader('loading data', 800)
    this.storage.get("user").then((data) => {
      if (!data) {
        this.navCtrl.push(LoginPage);
      }
    });

    this.carProvider.getCar().subscribe(
      result => {
        this.listBusDefault = result;
        this.listBus = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  public itemClick(item) {
    this.navCtrl.push(DetailPage, { "item": item });
  }

  public getListBus(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.listBus = this.listBusDefault.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.listBus = this.listBusDefault;
    }
  }

  public openModalAdd() {
    let myModalOptions: ModalOptions = {
      enableBackdropDismiss: false
    };
    let myModal: Modal = this.modalCtr.create(ModalPage, { data: this.bus }, myModalOptions);
    myModal.present();
  }

  public Logout() {
    this.storage.clear();
    this.navCtrl.push(LoginPage);
  }
}
