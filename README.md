## Angular Snippets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5 .

Every snippet is articulated around:
* *the context*: a brief description of the problem statement
* *concepts*: key points with code illustrations
* *demo*: link to demo of concepts
* *further*: if applicable, what would deserve more analysis

All snippets can be tried on the [demo installation](https://adelinor.github.io/angular-snippets)

## RxJs Recursive Observable

#### The context
You need to retrieve data with a paging API where the number of pages
required all data is not known in advance. You know that you finished
when:
* number of data items retrieved is *strictly smaller* than the page size
* or when you get an empty result set

#### Concepts

###### Service
The service that makes use of the paging API returns an `Observable`.
The result type (the generic type parameter) would typically be an
array of items.

###### Component
The caller of the service will *subscribe* to the returned `Observable` 
to display or process the incoming data.

###### Service implementation
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
class PageContext {
  startAt = 0;
  result: any = null;
  completed = false;
}
```

The signature of the method to *read a single page* is expressed as:

```ts
  processPage(ctx: PageContext): Observable<PageContext>
```

As a simplication, let's assume that the return type is a
`PageContext` and not an `Observable`. The algorithm to traverse
all pages would be something like:

```ts
while(! ctx.completed) {
    ctx = processPage(ctx);
}
```

... but the result type is an Observable. So the algorithm above
needs to be written with [Rx Operators](http://reactivex.io/documentation/operators.html).

To apply a basic transformation, one can use the [map](http://reactivex.io/documentation/operators/map.html) operator:
i.e. your tranformation is purely doing basic synchronous operations.
For example, if function t returns a type T, the return type of the 
expression below will be `Observable<T>`:

```ts
processPage(ctx).map( ctx => t(ctx) );
```

Here after reading a page, depending the status we either return
what we got: *a simple transformation*, or, we need to read another
page: *an async call* returning an observable. Because of the
second condition we need to use the [mergeMap](http://reactivex.io/documentation/operators/flatmap.html) operator.
Using map would make the return type be:

```ts
// No this is not what we want :( 
Observable<Observable<PageContext>>
```

So the simple while loop becomes:

```ts
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
```

#### Demo
The [demo to illustrate the implementation principle](https://adelinor.github.io/angular-snippets/#/rxjs-recursive-observable/factorial) computes
factorial. It works! But one has to wait for the full result: i.e. the algorithm above is *blocking*.

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