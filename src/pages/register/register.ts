import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { LoaderService } from '../../services/loader';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage extends LoaderService {

  private emailRegex = "^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$";
  private formRegister;
  message: string;
  classError: boolean;
  submitted: boolean = false;
  public base64Image: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
    public storage: Storage, public loadingCtrl: LoadingController, public camera: Camera, private afAuth: AngularFireAuth) {

    super(loadingCtrl = loadingCtrl);

    this.base64Image = "https://placehold.it/150x150";

    this.formRegister = this.formBuilder.group({
      'username': new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]),
      'password': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(25),
      ])),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.pattern(this.emailRegex)]))
    })
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

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }


  async register() {
    this.loader('Register loading...', 500);
    if (this.formRegister.value.username) {
      this.formRegister.value.username = this.formRegister.value.username.trim();
    }
    if (this.formRegister.value.password) {
      this.formRegister.value.password = this.formRegister.value.password.trim();
    }
    if (this.formRegister.value.email) {
      this.formRegister.value.email = this.formRegister.value.email.trim();
    }
    try {
      let result = await this.afAuth.auth.createUserWithEmailAndPassword(this.formRegister.value.email, this.formRegister.value.password);
      this.storage.set("user", result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
