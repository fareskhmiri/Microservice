import { createSelector } from '@ngrx/store';
import { findKey, get, isEmpty, uniqBy } from 'lodash';

import { PAGE, ROWS_SELECTED, SIZE, TOTAL_ITEMS, UPDATED_BY_CHILDREN, VARS } from './constants';
import { ScreenContext } from './states';

/**
 * Select the feature from the state
 */
export const getFeatureState = createSelector(
  (state, props: ScreenContext) => state[props.feature],
  state => state
);
/**
 * Select the component's screen from the feature's state
 */
export const getScreenState = createSelector(
  getFeatureState,
  (state, props: any) => state[props.screenType]
);
/**
 * Select the value of the component's screen
 */
export const selectValue = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId].value
      : [];
  }
);
/**
 * Select the value of the component's screen
 */
export const selectScreenState = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId] ? state.entities[props.screenId] : {};
  }
);
/**
 * Select the loading property of the possible Values
 */
export const selectPossibleValuesLoading = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]?.possibleValuesLoading &&
      state.entities[props.screenId]?.possibleValuesLoading[props.field]
  })
/**
 * select the possible values for a given field
 */
export const possibleValues = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId] &&
      state.entities[props.screenId].possibleValues
      ? state.entities[props.screenId].possibleValues[props.field] || []
      : [];
  }
);
/**
 * Select a property from screen's state
 */
export const selectIndexProperty = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? {
        currentIndex: state.entities[props.screenId]['currentIndex'],
        initialized: state.entities[props.screenId]['initialized'],
      }
      : undefined
  }
)
/**
 * Select the loading property of the component's screen
 */
export const selectLoading = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId].loading
      : false;
  }
);
/**
 * Select the loading property of the component's screen
 */
export const checkValidation = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? {
        validate: state.entities[props.screenId].validate,
        getData: state.entities[props.screenId].getData,
        lastStep: state.entities[props.screenId].lastStep
      }
      : false
  }
)
/**
 * Select the loading property of simple page (no entitites)
 * like Auth state
 */
export const selectPageLoading = createSelector(
  getFeatureState,
  (state, props: any) => {
    return state && state.loading ? state.loading : false;
  }
);
/**
 * Select the path property of the component's screen
 */
export const selectPath = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId].path
      : null;
  }
);
/**
 * Select the context variables for search screen such as: pageSize, criteria, pageNumber...
 */
export const selectSearchVars = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId][VARS]
      : {};
  }
);
/**
 * Select the loading property of the component's screen
 */
export const selectPageSize = createSelector(
  selectSearchVars,
  (state, props: any) => {
    return !isEmpty(state) ? state[SIZE] : 10;
  }
);
/**
 * Select the page number property of the component's screen
 */
export const selectPage = createSelector(
  selectSearchVars,
  (state, props: any) => {
    return !isEmpty(state) ? state[PAGE] : 1;
  }
);
/**
 * Select the rows selected property from the collection screen
 */
export const selectRowsSelected = createSelector(
  getScreenState,
  (state, props: any) => get(state.entities[props.screenId], ROWS_SELECTED, []));

/**
 * Select the count property of the component's screen
 */
export const selectCount = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId][TOTAL_ITEMS]
      : 0;
  }
);
/**
 * Select a property from screen's state
 */
export const selectProperty = createSelector(
  getScreenState,
  (state, props: any) => {
    return state.entities[props.screenId]
      ? state.entities[props.screenId][props.property]
      : props.defaultValue;
  }
);
/**
 * Select the entities of the value of a collection screen
 */
export const selectEntitiesValue = createSelector(selectValue, state => {
  if (state) {
    const entities = state.entities;
    if (entities) {
      if (!(entities instanceof Array)) {
        const values = Object.keys(entities);
        values.sort((first, second) => {
          const firstIndex = findKey(state.originalOrders, (value) => value === first);
          const secondIndex = findKey(state.originalOrders, (value) => value === second);
          if (firstIndex > secondIndex) {
            return 1;
          }
          if (firstIndex < secondIndex) {
            return -1;
          }
          return 0;
        });
        return values.map(entity => {
          const item = { ...entities[entity] };
          item.code = entity;
          return item;
        });
      } else {
        return entities;
      }

    } else {
      return [];
    }
  } else {
    return [];
  }
});
/**
 * Select the value of the provided role from a screen's value
 * If the screen's type collection,
 * the value's structure': value {ids: [], entities: {} }
 * If the screen's type form or view, the value is a json object
 */
export const selectRoleValue = createSelector(selectValue, (state, props: any) => {
  return state['entities'] ? state['entities'][props.code] : get(state, props.roleName);
});
/**
 * Select the roleName/value of comonent provided
 * the value's structure': value {ids: [], entities: {} }
 */
export const selectRoleNameValue = createSelector(getScreenState, (state, props: any) => {
  return filterList(getRoleValue(state, props), props);
});
/**
 * Select the grouped rows
 */
export const selectGroupedValue = createSelector(getScreenState, (state, props: any) => {
  return getCategories(filterList(getRoleValue(state, props), props), props);
});
/**
 * Gets the role value
 * @param state
 * @param props
 * @returns
 */
function getRoleValue(state, props) {
  const value = { ...state['entities'][props?.screenId]?.value };
  const roleValue = value && get(value, props?.roleName, undefined);
  const screenValue = value && value.entities && Object.values(value.entities);
  return screenValue || roleValue || [];
}
/**
 * Filters the provided value
 * @param value
 * @param props
 * @returns
 */
function filterList(value, props) {
  return value instanceof Array ? value.filter((item, index) => {
    if (typeof props.filterBy === "function") {
      item._index = index;
      return props.filterBy(item);
    }
    return true;
  }
  ) : value
}
/**
 *
 * @param values
 * @returns
 */
function getCategories(values, props) {
  return uniqBy(values, props.groupedBy).map((item: any) => {
    return {
      name: get(item, props.groupedBy).toString(),
      id: get(item, props.groupIdentifier),
      items: values.filter(subItem => get(subItem, props.groupedBy) === get(item, props.groupedBy))
    }
  })
}
/**
 * Select a property from the value
 */
export const selectPropertyValue = createSelector(selectValue, (state, props: any) => {
  return get(state, props.propertyName, props.defaultValue ? props.defaultValue : {});
});
/**
 * Select a child component state from its container
 */
export const selectWidgetData = createSelector(getScreenState,
  (state, props: any) => {
    return get(state.entities[props.screenId], `widgets.${props.widgetName}.${props.propertyName}`)
  });
/**
 * Select the value of the component's screen with the property "updatedByChildren"
 * The property updatedByChildren is updated to true only when a child component updates its parent
 */
export const selectValueState = createSelector(
  getScreenState,
  (state, props: any) => {
    const stateProps = state.entities[props.screenId]
    return stateProps
      ? {
        value: get(stateProps, 'value', []),
        lastUpdated: get(stateProps, 'lastUpdated', ''),
        propertyToModify: get(stateProps, 'propertyToModify', ''),
        updatedByChildren: get(stateProps, UPDATED_BY_CHILDREN, false),
      }
      : {}
  }
)
/**
 * Select the grouped rows for the search screen
 */
export const selectGroupingByValue = createSelector(selectValue, (state, props: any) => {
  return getCategories(filterList(state, props), props);
});
