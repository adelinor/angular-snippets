import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RxjsRecursiveObservableModule } from './rxjs-recursive-observable/rxjs-recursive-observable.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxjsRecursiveObservableModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
