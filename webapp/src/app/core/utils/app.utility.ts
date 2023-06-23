import { Injectable } from '@angular/core';
/**
 * Checks if a provided module is already loaded or not, it ensures that the core modules are loaded once
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyAppUtility extends AppUtility {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: AppUtility, useClass: MyAppUtility }
  ]
 ```
 * */
@Injectable({
  providedIn: 'root',
})
export class AppUtility {
  /**
   * Throws an error when the provided module is already loaded
   * @param parentModule
   * @param moduleName
   */
  public throwIfAlreadyLoaded(parentModule: any, moduleName: string) {
    if (parentModule) {
      throw new Error(
        `${moduleName} has already been loaded. Import Core modules in the AppModule only.`
      );
    }
  }
}
/**
 * Generate uniq number from an input string
 * @param string
 */
export function stringToHash(string) {
  let hash = 0;
  if (string.length == 0) return hash;
  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
}
