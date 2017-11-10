import { Component } from '@angular/core';

/**
 * Generated class for the DetailComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detail',
  templateUrl: 'detail.html'
})
export class DetailComponent {

  text: string;

  constructor() {
    console.log('Hello DetailComponent Component');
    this.text = 'Hello World';
  }

}
