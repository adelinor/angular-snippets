import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RxjsRecursiveObservableModule } from './rxjs-recursive-observable/rxjs-recursive-observable.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RxjsRecursiveObservableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
