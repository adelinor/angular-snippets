import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/expand';

class PageContext {
  startAt = 0;
  result = 1;

  constructor(private readonly n: number) { }

  get completed(): boolean {
    return this.startAt >= this.n;
  }
}

class FactorialSingleOperation {

  processPage(ctx: PageContext): Observable<PageContext> {
    console.log(`processPage( startAt=${ctx.startAt} )`);
    ctx.startAt = ctx.startAt + 1;
    ctx.result = ctx.result * ctx.startAt;
    return Observable.of(ctx).delay(500);
  }

}

interface FactorialOperation {

  factorial(n: number): Observable<number>;
}

class BlockingFactorialServiceImpl implements FactorialOperation {

  constructor(private singleOp: FactorialSingleOperation) { }

  factorial(n: number): Observable<number> {
    return this.iteratePages(new PageContext(n))
      .map(ctx => ctx.result);
  }

  private iteratePages(initialCtx: PageContext): Observable<PageContext> {
    return this.singleOp.processPage(initialCtx)
      .mergeMap(ctx => {
        if (ctx.completed) {
          return Observable.of(ctx);

        } else {
          return this.iteratePages(ctx);
        }
      });
  }
}

class ReactiveFactorialServiceImpl implements FactorialOperation {

  constructor(private singleOp: FactorialSingleOperation) { }

  factorial(n: number): Observable<number> {
    return Observable.of(new PageContext(n))
      .expand( ctx => {
        return (ctx.completed) ? Observable.empty() : this.singleOp.processPage(ctx);
      })
      .map(ctx => ctx.result);
  }
}

@Injectable()
export class FactorialService {

  private blockingImpl: FactorialOperation;
  private reactiveImpl: FactorialOperation;

  constructor() {
    const singleOp = new FactorialSingleOperation();
    this.blockingImpl = new BlockingFactorialServiceImpl(singleOp);
    this.reactiveImpl = new ReactiveFactorialServiceImpl(singleOp);
  }

  factorial(n: number): Observable<number> {
    return this.blockingImpl.factorial(n);
  }

  reactiveFactorial(n: number): Observable<number> {
    return this.reactiveImpl.factorial(n);
  }

}
