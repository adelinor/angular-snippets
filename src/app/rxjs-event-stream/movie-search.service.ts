import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';

@Injectable()
export class MovieSearchService {

  constructor() { }

  search(years: number[], categories: string[], name: string): Observable<string> {
    let result = '';

    if (name && name.length > 0) {
      result = 'name contains ' + name;
    }
    if (years && years.length > 0) {
      if (result.length > 0) {
        result += ' and ';
      }
      result += 'release date=' + years.join(' or ');
    }
    if (categories && categories.length > 0) {
      if (result.length > 0) {
        result += ' and ';
      }
      result += 'category=' + categories.join(' or ');
    }
    return Observable.of(result).delay(2000);
  }

}
