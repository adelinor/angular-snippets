## Angular Snippets

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.5 . To run this
locally, see the [CLI documentation section](#develop-and-build-this-project).

Every snippet is articulated around:
* *the context*: a brief description of the problem statement
* *concepts*: key points with code illustrations
* *demo*: link to demo of concepts
* *further*: if applicable, what would deserve more analysis

###### List of snippets:
* [RxJs Recursive Observable](#rxjs-recursive-observable)
* [RxJs Observable reactive recursivity](#rxjs-observable-reactive-recursivity)
* [HTML 5 Blob save](#html-5-blob-save)

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
The [demo to illustrate the implementation principle](https://adelinor.github.io/angular-snippets/#/rxjs-recursive-observable/factorial;n=8) computes
factorial. See the [factorial.service.ts](src/app/rxjs-recursive-observable/factorial/factorial.service.ts) implementation:
* A delay of 500ms is introduced to mimick the latency of retrieving one page of items
* The code is almost identical to the snippets above.

It works! But one has to wait for the full result: i.e. the implementation above yields the results *until the very last iteration*.

## RxJs Observable reactive recursivity

#### The context

As in the section [RxJs Recursive Observable](#rxjs-recursive-observable) 
we need to read data by iterating through pages. This time we want to
*issue results as soon as we get them* from a page.

#### Concepts

We used an Observable in the [previous section](#rxjs-recursive-observable) but nevertheless ended up with a blocking implementation. Whereas writing a loop is easy, emitting intermediary results was a strugle, until I understood the ...

###### RxJs expand operator
The [RxJs expand operator][expand-operator-url] will keep calling the function passed as an argument until it
returns `Observable.empty()`. 

[expand-operator-url]: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/expand.md

Let's take a close look at the `ReactiveFactorialServiceImpl` class, in [factorial.service.ts](src/app/rxjs-recursive-observable/factorial/factorial.service.ts#L60):

```ts
factorial(n: number): Observable<number> {
  return Observable.of(new PageContext(n))
    .expand( ctx => {
      return (ctx.completed) ? Observable.empty() : this.singleOp.processPage(ctx);
    })
    .map(ctx => ctx.result);
}
```

From the perspective of an imperative style developer, the [expand][expand-operator-url] operator will:
* emit the results down the transformation chain after every call
* will reinject the non empty result as an input in the next call to the function in expand

#### Demo

Try now the [demo](https://adelinor.github.io/angular-snippets/#/rxjs-recursive-observable/factorial;n=8;reactive=true) and see how intermediary results are delivered at every step of the calculation :smile:


#### Further

A consequence of letting the user seeing results as they arrive is to let him *interrupt* the sequence. For this, the article on [RxJs Dont't unsuscribe | Medium.com](https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87) proposes
the use of the [takeUntil](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-takeUntil) operator.
A very good illustration can be found in the [example | Aligator.io/angular](https://alligator.io/angular/takeuntil-rxjs-unsubscribe/).

## HTML 5 Blob save

#### The context

You want to the user to save content on her/his local device. This content is typically provided by an API.

#### Concepts

###### Store downloaded content in browser

The downloaded content is saved in the browser's local storage and made
available to the download to the user by creating a so called
*HTML 5 blob URL* with the method `createObjectURL`.:

```ts
const xml = '<hello></hello>';
const cnt = new Blob([xml], {type: 'text/xml'});
const url = window.URL.createObjectURL(cnt);
```
The locator from the variable `url` is then included in an anchor element `<a href="">` to allow the user to *save* the file.


###### Mark the download URL as safe

Angular will prevent a raw URL generated with the `createObjectURL`
method from working if used as is by adding the prefix `unsafe:`.
To avoid this, one has to inject the `DomSanitizer` utility as
shown in the [blob-save.component.ts](src/app/blob-save/blob-save.component.ts) component.
It will generate a `SafeUrl` object which can then be used in
the HTML view: see  [blob-save.component.html](src/app/blob-save/blob-save.component.html).

###### Dispose of storage space after use

The storage space needs to be freed up with the method `window.URL.revokeObjectURL` to avoid memory leaks.
This call is made by the `ngOnDestroy` method in 
[blob-save.component.ts](src/app/blob-save/blob-save.component.ts#L24).

#### Demo

Check the [demo](https://adelinor.github.io/angular-snippets/#/blob-save).

#### Further

The user experience from the [demo](https://adelinor.github.io/angular-snippets/#/blob-save) displays the progress and the option to save on the same page. This would need to be included in a pop-up for a real app.


## Develop and build this project

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


[![Build Status][travis-badge]][travis-badge-url]

[travis-badge]: https://travis-ci.org/adelinor/angular-snippets.svg?branch=master
[travis-badge-url]: https://travis-ci.org/adelinor/angular-snippets