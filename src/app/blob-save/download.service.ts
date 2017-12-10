import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DownloadService {

  private xml = `<theRoot element="hello">
      <child><header name="something">Some very long value</header></child>
    </theRoot>`;

  constructor() { }

  getDoc(): Observable<string> {
    return Observable.of(this.xml).delay(2000);
  }
}
