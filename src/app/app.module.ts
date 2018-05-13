import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';
import { FactorialComponent } from './rxjs-recursive-observable/factorial/factorial.component';
import { BlobSaveComponent } from './blob-save/blob-save.component';
import { DownloadService } from './blob-save/download.service';
import { RxjsEventStreamComponent } from './rxjs-event-stream/rxjs-event-stream.component';
import { MovieSearchService } from './rxjs-event-stream/movie-search.service';
import { MockingComponent } from './mocking/mocking.component';
import { SampleService } from './mocking/sample.service';
import { MockingModule } from './mocking/mocking.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FactorialComponent,
    BlobSaveComponent,
    RxjsEventStreamComponent,
    MockingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MockingModule.forMocks()
  ],
  providers: [
    FactorialService,
    DownloadService,
    MovieSearchService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
