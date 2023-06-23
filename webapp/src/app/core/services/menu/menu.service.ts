import { AuthManagerService } from '@services/auth/auth-manager.service';
import { Injectable } from '@angular/core';

import { environment } from '@env/environment';
/**
 * A class that filters the main menu's entries according to the user's roles and
 * gets/sets the option of expanding or collapsing the menu's panel in the localStorage.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyMenuService extends MenuService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: MenuService, useClass: MyMenuService }
  ]
 ```
 * */
 @Injectable({
  providedIn: 'root'
})
export class MenuService {
  /**
   * The local storage key
   */
  LOCAL_STORAGE_KEY: string;
  /**
   * The default state of the menu's panel
   */
  menuInitialState: boolean;

  constructor(private authService: AuthManagerService) {
    this.LOCAL_STORAGE_KEY = `${environment.prefix}_${this.authService.getUserName()}_Menu`;
  }
  /**
   * Filters the main menu's entries according to the user's roles
   * @param menu
   */
  filterByRole(menu: any[],listMenuFromSecurity:any[]) {
    return menu.filter(item => {
      const itemId = item.id;
      const roles = listMenuFromSecurity?.[itemId]?.roles ||  [];
      roles.push('admin');
      const hasRole = this.authService.isUserRolesHas(new Set(roles));
      if (item.items) {
        item.items = this.filterMenuItems(item.items, itemId,listMenuFromSecurity);
      }
      return hasRole ;
    }); 
  }

    /**
    * Filters the items of menu's entries according to the user's roles
    * @param items
    * @param parentId
    * @param listMenuFromSecurity
    */

  filterMenuItems(items: any[], parentId: string ,listMenuFromSecurity:any): any[] {
    return items.filter(subItem => {
      const subItemId = `${parentId};${subItem.id}`;
      const roles = listMenuFromSecurity?.[subItemId]?.roles || [];
      roles.push('admin');
      const hasRole = this.authService.isUserRolesHas(new Set(roles));
      if (subItem.items) {
        subItem.items = this.filterMenuItems(subItem.items, subItemId , listMenuFromSecurity);
      }
      return hasRole ;
    });
  }
  /**
   * Store in the localStorage the option of expanding or collapsing the menu's panel
   * @param value
   */
  setMenuState(value) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, value ? 'expanded' : 'collapsed');
  }
  /**
   * Gets from the localStorage the option of expanding or collapsing the menu's panel
   */
  getMenuInitialState(){
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) === 'expanded' ? true : false;
  }
}
