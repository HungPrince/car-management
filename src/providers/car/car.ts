import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database-deprecated'

import { Bus } from "../../models/bus";

@Injectable()
export class CarProvider {

  // urlApi = "https://api.myjson.com/bins/vmscn";
  listBus: any;
  constructor(public http: Http, public database: AngularFireDatabase) {
    console.log('Hello CarProvider Provider: use get info car');
  }

  getCar(): Observable<any> {
    return this.database.list('bus');
  }

  addCar(bus: Bus) {
    this.database.list('bus').push(bus);
  }

  deleteCar(id: string) {
    this.database.list('bus').remove(id);
  }

}
