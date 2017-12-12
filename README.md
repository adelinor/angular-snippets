## Angular Snippets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5 .

Every snippet is articulated around:
* *the context*: a brief description of the problem statement
* *concepts*: key points with code illustrations
* *demo*: link to demo of concepts
* *further*: if applicable, what would deserve more analysis

All snippets can be tried on the [demo installation](https://adelinor.github.io/angular-snippets)

## RxJs Recursive Observable

#### Context
You need to retrieve data with a paging API where the number of pages
required all data is not known in advance. You know that you finished
when:
* number of data items retrieved is *strictly smaller* than the page size
* or when you get an empty result set

#### Concepts

__Service__
The service that makes use of the paging API returns an `Observable`.
The result type (the generic type parameter) would typically be an
array of items.

__Component__
The caller of the service will *subscribe* to the returned `Observable` 
to display or process the incoming data.

__Service implementation__
Iterating through pages will be implemented with the Angular
`HttpClient`.
It will start from the initial page (position zero) and move up until
the last.

From a single page, we:
* get a **result**
* get to know the next **start at** position for reading the next page
* also find out whether the page traversal is **complete**.

This is encapsulated in:

```ts
class IterationContext {
  startAt = 0;
  result: any = null;
  completed = false;
}
```

The implementation of the **method to perform a single iteration** has
the signature:

```ts
    processPage(ctx: IterationContext): Observable<IterationContext>
```

As a simplication, let's assume that the return type is an
`IterationContext` and not an `Observable`. The algorithm to traverse
all pages would be something like:

```ts
while(! ctx.completed) {
    ctx2 = processPage(ctx);
    ctx2.result = concatenate(ctx.result, ctx2.result);
    ctx = ctx2;
}
```

... but the result type is an Observable so the algorithm above
needs to be written with [Rx Operators](http://reactivex.io/documentation/operators.html).

To apply a basic transformation, one can use the [map](http://reactivex.io/documentation/operators/map.html) operator:
i.e. your tranformation is purely doing basic synchronous operations
and you return a non observable type T.

Here after reading a page, depending the status we either return
what we got: *a simple transformation*, or, we need to read another
page: *an async call* returning an observable. Because of the
second condition we need to use the [mergeMap](http://reactivex.io/documentation/operators/flatmap.html) operator.

So the simple while loop becomes:

```ts
private iteratePages(ctx: IterationContext): Observable<IterationContext> {
    return this.processPage(ctx)
        .mergeMap(ctx2 => {
            ctx2.result = concatenate(ctx.result, ctx2.result);
            if (ctx2.completed) {
                return Observable.of(ctx2);

            } else {
                return this.iteratePages(ctx2);
            }
    });
}
```

... To be continued.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[![Build Status][travis-badge]][travis-badge-url]

[travis-badge]: https://travis-ci.org/adelinor/angular-snippets.svg?branch=master
[travis-badge-url]: https://travis-ci.org/adelinor/angular-snippets