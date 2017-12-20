import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AutoCompleteService } from 'ionic2-auto-complete';
import 'rxjs/add/operator/map';

import { CarProvider } from '../car/car';

@Injectable()
export class SearchProvider implements AutoCompleteService {

  labelAttribute = "Name";
  public listCountries = [];

  constructor(public http: Http, public carProvider: CarProvider) {
  }

  getResults(keyword: string) {
    return this.http.get("https://restcountries.eu/rest/v1/name/" + keyword)
      .map(
      result => {
        console.log(result.json());
        this.listCountries = result.json()
          .filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()));
        return this.listCountries;
      });
  }

  // getResults(keyword: string) {
  //   return this.carProvider.getCar().subscribe(data=>{
  //     console.log(data.filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase())));
  //     return data.filter(item => item.name.toLowerCase().startsWith(keyword.toLowerCase()));
  //   });
  // }
}
