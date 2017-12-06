import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RxjsRecursiveObservableModule } from './rxjs-recursive-observable/rxjs-recursive-observable.module';
import { AppRoutingModule } from './app-routing.module';
import { BlobSaveModule } from './blob-save/blob-save.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RxjsRecursiveObservableModule,
    BlobSaveModule,
    AppRoutingModule
  ],
  providers: [ FactorialService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
