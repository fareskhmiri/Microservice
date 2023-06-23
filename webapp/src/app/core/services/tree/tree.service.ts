import { Injectable } from "@angular/core";

import { isEmpty, get, groupBy, isNumber } from "lodash";
import { GridPipe } from '@app/shared/pipes/grid.pipe';
import { utc } from 'moment';
/**
 * The tree node interface
 */
export interface TreeNode {
  /**
   * The data property
   */
  data?: any;
  /**
   * The nodes property
   */
  children?: TreeNode[];
  /**
   * The leaf property
   */
  leaf?: boolean;
  /**
   * The expanded property
   */
  expanded?: boolean;
  /**
   * The parent property
   */
  parent?: TreeNode;
  /**
   * The depth property
   */
  depth?: number;
}
/**
 * A class that builds the Tree nodes used in a `Tree` component.
 *
 * This class should not be modified directly, you can provide your own service which should extend the default one as follows:
 ```
  export class MyTreeGridService extends TreeGridService {
   ...
  }
 ```
 * And provide your class in the `core/custom-core.module.ts` file as follows:
 ```
  providers: [
   { provide: TreeGridService, useClass: MyTreeGridService }
  ]
 ```
 * */
@Injectable({
  providedIn: "root"
})
export class TreeGridService {

  constructor(private pipe: GridPipe) { }
  /**
   * Creates the model of Primeng Tree Table component
   * @param items
   * @param groups
   * @returns {TreeNode[]}
   */
  public createTreeNode(items: any[], firstColumn: string, groups: any[]): TreeNode[] {
    return this.getTreeNodes(
      items.map(item => ({ data: item, children: [] })),
      firstColumn,
      groups
    );
  }
  /**
   * Creates the nodes deeply using lodash groupBy function
   * @param nodes
   * @param groups
   * @returns {TreeNode[]}
   */
  private getTreeNodes(nodes: TreeNode[], firstColumn: string, groups: any[]): TreeNode[] {
    if (!isEmpty(groups)) {
      nodes = this.groupBy(nodes, firstColumn, groups.shift());
      if (!isEmpty(groups)) {
        nodes = nodes.map(item => {
          item.children = this.getTreeNodes(item.children, firstColumn, groups);
          return item;
        });
      }
    }
    return nodes;
  }
  /**
   * Group the provided items by the groupName property
   * @param items
   * @param groupName
   * @returns {Array}
   */
  private groupBy(items: any[], firstColumn: string, groupName) {
    const nodes = [];
    const result = groupBy(items, item => {
      return this.getGroupName(groupName, item);
    });
    Object.keys(result).forEach(key => {
      nodes.push({ data: { [firstColumn]: key, isGrp: true }, children: result[key] });
    });
    return nodes;
  }
  /**
   * Gets the group name from the provided item
   * @param grp
   * @param item
   * @returns {string}
   */
  private getGroupName(grp: any, item: any) {
    if (grp.keys) {
      return grp.keys
        .split(",")
        .reduce((result, key) => {
          result.push(this.format(get(item, `data.${grp.name}.${key}`)));
          return result;
        }, [])
        .join(" | ");
    } else {
      return this.format(get(item, `data.${grp.name}`));
    }
  }
  /**
   * Formats the provided value using the GridPipe
   * @param value
   * @returns {string}
   */
  private format(value: any) {
    if (isNumber(value) && value) {
      return this.pipe.transform(value.toString(), 'number');
    }
    const utcValue = utc(value);
    if (utcValue.isUtc() && isNaN(value && value)) {
      return this.pipe.transform(value.toString(), 'date', 'Date');
    }
    return value;
  }
}
