import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {clock, people} from './reducers';
import {ClockComponent} from './clock/clock.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({clock: clock, people : people })
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule {
}
