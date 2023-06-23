import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
/**
 * This class enable displaying or hiding messages by emitting values to the Subject observable
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyLoaderService extends LoaderService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: LoaderService, useClass: MyLoaderService }
  ]
 ```
 */
@Injectable()
export class LoaderService {
  /**
   * Subject event emitter
   */
  private loaderSubject = new Subject<boolean>();
  /**
   * Observable event emitter
   */
  loaderState = this.loaderSubject.asObservable();
  /**
    * Displays the loader
    * @returns {void}
    */
  show() {
    this.loaderSubject.next(true);
  }
  /**
    * Hides the loader
    * @returns {void}
    */
  hide() {
    this.loaderSubject.next(false);
  }
}
