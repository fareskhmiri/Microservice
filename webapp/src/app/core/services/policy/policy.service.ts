import { Injectable } from '@angular/core';

import { AuthManagerService } from '@services/auth/auth-manager.service';
import { get } from 'lodash';
/**
 * This Guard decides if a component like "screen", "action" or "field" can be `activated` or `not`.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyPolicyService extends PolicyService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: PolicyService, useClass: MyPolicyService }
  ]
 ```
 * */
@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private authService: AuthManagerService) { }
  /**
   * Decides if the provided policies' roles are `restricted` or `not`
   * @param policies
   * @returns {boolean}
   */
  isRestricted(policies: Policy[]): boolean {
    if (policies) {
      const roles = this.authService.getRoles();
      return roles.some(
        role => policies.find(policy => policy.role === role)
      );
    }
    return false;
  }

  /**
 * Decides if the screen's roles are `authorized` or `not`
 * @param feature The feature key
 * @param screen The screen key
 * @returns {boolean}
 */
  isScreenAuthorized(feature, screen?): boolean {
    return !this.isRestricted(this.getPolicies(feature, screen));
  }

  /**
 * Decides if the field's access is `restricted` or `not`
 * @param feature The feature key
 * @param screen The screen key
 * @param field The field key
 * @returns {boolean}
 */
  isComponentRestricted(feature, screen?, field?, mode = 'view'): boolean {
    return this.isRestricted(this.getPolicies(feature, screen, field, mode));
  }

  /**
 * Gets the policies for the specified feature, screen, and field, optionally filtered by use case
 * @param feature The feature key
 * @param screen The screen key
 * @param field The field key
 * @param mode Optional. The use case to filter by, e.g. "view", "edit", etc.
 * @returns {Policy[]} An array of policies for the specified feature, screen, and field.
 */
  getPolicies(feature, screen?, field?, mode?): Policy[] {
    let restrictedRolesList = null;
    const securityData = this.authService.getSecurityData();
    if (!field) {
      restrictedRolesList = get(
        securityData,
        `screens.${feature}.${screen}.restrictedRoles`
      );
    } else {
      restrictedRolesList = get(
        securityData,
        `screens.${feature}.${screen}.components.${field}.restrictedRoles.${mode}`
      );
    }
    return restrictedRolesList ? restrictedRolesList.map(role => ({ role })) as Policy[] : [];
  }

  /**
   * Extracts the feature, screen, and component keys from a string path.
   * @param path The path string to extract keys from.
   * @returns An object containing the feature, screen, and component keys.
   */
  keysExtractor(path: string) {
    let arrayed = path.split(',');
    return {
      feature: arrayed[0],
      screen: arrayed[1],
      component: arrayed[2]
    }
  }
}
/**
 * Policy contract interface
 */
export interface Policy {
  /**
   * The role property
   */
  role: string;
  /**
   * The condition property
   */
  condition?: {
    expression: string;
    calculationBase: string[];
  };
}
