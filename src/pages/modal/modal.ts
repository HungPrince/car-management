import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, Modal, ModalOptions, ActionSheetController, ViewController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { storage } from "firebase";

import { Bus } from './../../models/bus';
import { CarProvider } from './../../providers/car/car';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  currentImage: string = null;
  bus: Bus;
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public filePath: FilePath, public toast: ToastController,
    public camera: Camera, public navParams: NavParams, public view: ViewController, public carParovider: CarProvider, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
  }

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    allowEdit: true,
    targetHeight: 300,
    targetWidth: 300,
    saveToPhotoAlbum: false
  };

  public pathForImage(img) {
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  randomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }


  public async takePicture(sourceType) {

    let result = await this.camera.getPicture(this.options);
    let imagePath = `data:image/jpeg;base64,${result}`;
    let picture = storage().ref('pictures_' + this.randomString(10));
    picture.putString(imagePath, 'data_url').then(snapshot => {
      this.currentImage = snapshot.downloadURL;
    });

    // return this.camera.getPicture(this.options).then(imagePath => {
    //   // Special handling for android library
    //   console.log(imagePath);
    //   if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
    //     return this.filePath.resolveNativePath(imagePath).then(filePath => {
    //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
    //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
    //       this.picture.putString(imagePath, 'data_url');
    //     });
    //   } else {
    //     let correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
    //     let currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
    //     this.picture.putString(imagePath, 'data_url');
    //   }
    // });

  }

  presentToast() {
    let toast = this.toast.create({
      message: 'Create the bus successfully!',
      duration: 800,
      position: 'bottom'
    });
    toast.present();
  }

  public saveImage() {

  }

  public addBus(bus) {
    bus.image = this.currentImage;
    this.carParovider.addCar(bus);
    this.presentToast();
    setTimeout(() => {
      this.navCtrl.pop();
    }, 1000)
  }

}
