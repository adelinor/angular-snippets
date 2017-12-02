import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/expand';

class PageContext {
  startAt = 0;
  result = 1;

  constructor(private readonly n: number) { }

  get completed(): boolean {
    return this.startAt >= this.n;
  }
}

@Injectable()
export class FactorialService {

  constructor() { }

  factorial(n: number): Observable<number> {
    return this.iteratePages(new PageContext(n))
      .map(ctx => ctx.result);
  }

  private iteratePages(initialCtx: PageContext): Observable<PageContext> {
    return this.processPage(initialCtx)
      .mergeMap(ctx => {
        if (ctx.completed) {
          return Observable.of(ctx);

        } else {
          return this.iteratePages(ctx);
        }
      });
  }

  reactiveFactorial(n: number): Observable<number> {
    return Observable.of(new PageContext(n))
      .expand( ctx => {
        return (ctx.completed) ? Observable.empty() : this.processPage(ctx);
      })
      .map(ctx => ctx.result);
  }

  private processPage(ctx: PageContext): Observable<PageContext> {
    console.log(`processPage( startAt=${ctx.startAt} )`);
    ctx.startAt = ctx.startAt + 1;
    ctx.result = ctx.result * ctx.startAt;
    return Observable.of(ctx);
  }
}