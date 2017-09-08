import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/Observable/merge';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Store} from '@ngrx/store';
import {clock, people} from './reducers';
import {HOUR, SECOND, ADVANCE, RECALL} from './reducers';
import 'rxjs/add/operator/withLatestFrom';
import {COMMON_DIRECTIVES} from '@angular/common/src/directives';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  click$ = new Subject()
    .map((value: string) => ({type: HOUR, payload: parseInt(value, 10)}));
  person$ = new Subject().map((value) => ({type: ADVANCE, payload: value}));
  seconds$ = Observable.interval(1000).mapTo({type: SECOND, payload: 1});
  recall$ = new Subject();
  message = 'Angular RX demo';
  time;
  people;

  constructor(store: Store<any>) {
    this.time = store.select('clock');
    this.people = store.select('people');

    Observable.merge(
      this.click$,
      this.seconds$,
      this.person$,
      this.recall$.withLatestFrom(this.time, (_, y) => y)// first arguement will be the this.time itself which we wanted to ignore.
        .map(time => ({type: RECALL, payload: time}))
    ).subscribe(store.dispatch.bind(store));
  }
}
