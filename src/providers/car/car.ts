import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';



@Injectable()
export class CarProvider {

  urlApi = "https://api.myjson.com/bins/vmscn";

  constructor(public http: Http) {
    console.log('Hello CarProvider Provider: use get info car');
  }

  getCar(): Observable<any> {
   
    return this.http.get(this.urlApi);
  }

}
