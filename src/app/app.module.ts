import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';
import { FactorialComponent } from './rxjs-recursive-observable/factorial/factorial.component';
import { BlobSaveComponent } from './blob-save/blob-save.component';
import { DownloadService } from './blob-save/download.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FactorialComponent,
    BlobSaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FactorialService,
    DownloadService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
