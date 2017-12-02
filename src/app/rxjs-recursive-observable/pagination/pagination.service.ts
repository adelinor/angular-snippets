import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

class PageContext {
  links: string[] = [];
  get completed(): boolean {
    return (this.url == null);
  }

  constructor(public url: string) {}
}

@Injectable()
export class PaginationService {

  private static readonly URL = 'https://api.github.com/search/code?q=addClass+user:mozilla&per_page=100';

  constructor(private http: HttpClient) { }

  allPagesLinks(): Observable<string[]> {
    return this.iteratePages(new PageContext(PaginationService.URL))
      .map( ctx => ctx.links);
  }

  private processPage(ctx: PageContext): Observable<PageContext> {
    return this.showLink('next', ctx.url).map( nextLink => {
      ctx.links.push(ctx.url);
      ctx.url = nextLink;
      return ctx;
    })

  }

  private iteratePages(initialCtx: PageContext): Observable<PageContext> {
    return this.processPage(initialCtx)
      .mergeMap(ctx => {
        console.log(`Invoked ${ctx.url}`);
        if (ctx.completed) {
          return Observable.of(ctx);

        } else {
          return this.iteratePages(ctx);
        }
      });
  }

  showLink(name: string, url: string = PaginationService.URL): Observable<string> {
    return this.http.get(url, {observe: 'response'})
      .map( resp => {
        return this.extract(resp.headers.get('Link'), name);
      });
  }

  protected extract(linkHeader: string, linkName: string): string {
    let result: string = null;
    const links = linkHeader.split(', ');
    for (let i = 0; i < links.length; i++) {
      const [l, r] = links[i].split('; ');
      if (r === `rel="${linkName}"`) {
        result = l.substring(1, l.length - 1);
      }
    }
    return result;
  }
}
