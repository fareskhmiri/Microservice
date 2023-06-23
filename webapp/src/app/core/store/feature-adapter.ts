import { EntityAdapter } from '@ngrx/entity';
import { get, isEmpty, set, uniqBy } from 'lodash';

import { ScreenState } from './states';
import * as virtualScrollUtils from '../../shared/components/virtual-scroll/virtual-scroll-service'

/**
 * Update the entity with the provided changes as parameter
 * @param state
 * @param changes
 * @param payload
 * @param adapter
 * @returns {object}
 */
export function updateEntity<T>(
  state: any,
  changes: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  return adapter.updateOne(
    {
      id: payload.id,
      changes: changes
    },
    state
  );
}
/**
 * Update the value of a relation for the owner screen
 * @param state
 * @param payload
 * @param adapter
 */
 export function updateRelationValue<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>,
  updatedByChildren = false,
  transformer = undefined
) {
  const id = (payload.ids && payload.ids.split(',').pop()) || payload.rootId;
  if (state.entities[id]) {
    const roleName =  payload.roleName
    const value = { ...state.entities[id].value };
    const relationValue = [...get(value, roleName, [])];
    if(payload.rowId >= 0) {
      set(value, roleName + '.' + payload.rowId, payload.value)
    } else {
      relationValue.push(payload.value)
      set(value, roleName, relationValue)
    }
    if(typeof transformer === 'function') {
      set(value, roleName, transformer(relationValue))
    } 
    const changes = {
      value: { ...value },
      updatedByChildren,
      lastUpdated: new Date().toISOString(),
      propertyToModify: roleName
    };
    return adapter.updateOne(
      {
        id: id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
/**
 * Update the value of a relation for the owner screen
 * @param state
 * @param payload
 * @param adapter
 */
 export function removeRelationValue<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>,
  updatedByChildren = false
) {
  const id = payload.targetCtx?.rootId;
  if (state.entities[id]) {
    const roleName =  payload.targetCtx.roleName
    const value = { ...state.entities[id].value };
    const relationValue = [...get(value, roleName, [])];
    relationValue.splice(payload.rowId, 1)
    set(value, roleName, relationValue)
    const changes = {
      value: { ...value },
      updatedByChildren,
      lastUpdated: new Date().toISOString(),
      propertyToModify: roleName
    };
    return adapter.updateOne(
      {
        id: id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
/**
 * Update the value of a relation for the owner screen
 * @param state
 * @param payload
 * @param adapter
 */
 export function updatePropertyValue<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>,
  updatedByChildren = false
) {
  const currentState = get(state.entities, payload.targetCtx.screenId, get(state.entities, payload.targetCtx.rootId));
  if (currentState) {
    const roleName =  payload.targetCtx.roleName || payload.propertyToModify
    const value = { ...currentState.value };
    set(value,roleName,payload.value);
    const changes = {
      value: { ...value },
      updatedByChildren,
      lastUpdated: new Date().toISOString(),
      propertyToModify: roleName
    };
    return adapter.updateOne(
      {
        id: currentState.id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
/**
 * Update the data value
 * @param state
 * @param payload
 * @param adapter
 */
 export function updateData<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  return adapter.updateOne(
    {
      id: payload.id,
      changes: {
        value: { ...payload.data },
        isValid: payload.isValid,
        validate: false,
        getData: false,
        displayScreen: payload.displayScreen,
        updatedByChildren: false
      }
    },
    state
  )
}
/**
 * Enable the loading state of the children component
 * @param state
 * @param componentName
 * @param payload
 * @param adapter
 */
 export function enableChildrenLoading<T>(
  state: any,
  componentName: string,
  payload: any,
  adapter: EntityAdapter<any>
) {
  if (state.entities[payload.id]) {
    return adapter.updateOne({ id: payload.id, changes: {children: {[componentName]: {loading: true}} } }, state);
  } else {
    return state;
  }
}
/**
 * Share Widget Data
 * @param state
 * @param payload
 * @param adapter
 */
 export function shareWidgetData<T>(state: any, payload: any, adapter: any) {
  if (state.entities[payload.id]) {
    const changes = {
      widgets: {
        ...get(state.entities[payload.id], 'widgets', {}),
        [payload.widgetName]: { [payload.propertyName]: payload.value },
      },
    }
    return adapter.updateOne(
      {
        id: payload.id,
        changes,
      },
      state
    )
  } else {
    return state
  }
}
/**
 * Set a new value to a given property that is indexed by key
 * @param state
 * @param id
 * @param payload
 * @param adapter
 */
export function updateFieldPossibleValues<T>(
  state: any,
  id: string,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  if (state.entities[id]) {
    const entity = state.entities[id];
    const possibleValues = entity['possibleValues'] || {};
    let fieldKey = payload.field;
    if (payload.vars && payload.vars.hasOwnProperty("index")) {
      fieldKey = `${fieldKey}${payload.vars.index}`;

    }
    possibleValues[fieldKey] = payload.possibleValues;
    if (!payload.formatPossibleValuesOff) {
      const value =
        payload.possibleValues instanceof Array &&
        payload.possibleValues?.map((item) => ({
          value: item instanceof Object ? { ...item } : item,
          label:
            item instanceof Object
              ? (payload.keys &&
                  payload.keys.map((elm) => get(item, elm)).join(payload.separator)) ||
                item
              : item,
        }));
      possibleValues[fieldKey] = value;
    }
    const changes = { loading: false, possibleValues: { ...possibleValues } };
    return adapter.updateOne({ id, changes }, state);
  } else {
    return state;
  }
}
/**
 * possible Values loading
 * @param state
 * @param payload
 * @param adapter
 */
export function updatePossibleValuesLoading<T>(
  state: any,
  id: string,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>,
  loading: boolean
) {
  if (state.entities[id]) {
    const entity = state.entities[id];
    const possibleValuesLoading = entity['possibleValuesLoading'] || {};
    let fieldKey = payload.field;
    if (payload.vars && payload.vars.hasOwnProperty("index")) {
      fieldKey = `${fieldKey}${payload.vars.index}`;

    }
    possibleValuesLoading[fieldKey] = loading
    const changes = { loading: false, possibleValuesLoading: { ...possibleValuesLoading } };
    return adapter.updateOne({ id, changes }, state);
  } else {
    return state;
  }
}

/**
 * Initialise the value of an entity
 * @param state
 * @param payload
 * @param adapter
 */
export function initValue<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  const changes = {
    value: payload.result,
    loading: false,
    lastUpdated: new Date().toISOString(),
    propertyToModify: undefined,
    initialized: true
  };
  const id = payload.id;
  return adapter.updateOne(
    {
      id: id,
      changes: changes
    },
    state
  );
}

/**
 * get the code value
 * @param obj
 */

export function getCodeValue(obj: any, index : any) {
  return obj.code ? obj.code : obj.id ? obj.id : index;
}

/**
 * Initialise the value of collection screen with the following structure:
 * {ids: [], entities: {} }
 * @param state
 * @param payload
 * @param adapter
 */
export function initValueEntities<T>(state: any, payload: any, adapter: any) {
  const id = payload.id;
  if (state.entities[id]) {
    const currentValue = get(state.entities[id], 'value.entities');
    let mapItems = payload.result ? payload.result : []
    let originalOrders = {};
    if (mapItems && mapItems instanceof Array) {
      if(isEmpty(currentValue) || !(currentValue instanceof Array) ) {
        mapItems = mapItems.reduce((obj, item, index) => {
          obj[getCodeValue(item, index)] = item;
          originalOrders[index] = getCodeValue(item, index);
          return obj;
        }, {});
      }
    }
    const changes = {
      value: {
        ids: [],
        entities: mapItems,
        originalOrders
      },
      loading: false
    };
    return adapter.updateOne(
      {
        id: id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
/**
 * Set the loading state to true of a screen
 * @param state
 * @param payload
 * @param adapter
 */
 export function enableLoading<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>,
  keys = undefined
) {
  const loading = !keys || keys.includes(payload.field) ? true: false; 
  return adapter.updateOne(
    {
      id: payload.id,
      changes: { loading }
    },
    state
  );
}
/**
 * Set the loading state to false of a screen
 * @param state
 * @param payload
 * @param adapter
 */
 export function disableLoading<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  return adapter.updateOne(
    {
      id: payload.id,
      changes: { loading: false }
    },
    state
  );
}
/**
 * Initialise an empty value of an entity and disable the loading in
 * case of Error dispatched action
 * @param state
 * @param payload
 * @param adapter
 */
export function cancelLoading<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  return adapter.updateOne(
    {
      id: payload.id,
      changes: {
        loading: false
      }
    },
    state
  );
}
/**
 * Update the entities value map of a collection screen
 * @param state
 * @param payload
 * @param adapter
 */
export function updateOneRelationItems<T>(
  state: any,
  payload: any,
  adapter: EntityAdapter<ScreenState<T>>
) {
  const id = findScreen(payload, state);
  if (state.entities[id]) {
    const value = { ...state.entities[id].value };
    const relationData = payload.value instanceof Array ? uniqBy([...payload.value],'code') : { ...payload.value };
    delete relationData['payload'];
    delete relationData['targetCtx'];

    const code = relationData.code
      ? relationData.code
      : payload.code
        ? payload.code
        : getTemporaryCode();

        relationData instanceof Array
        ? (value.entities = relationData)
        : payload.overrideValue
          ? (value.entities = { [code]: relationData })
          : (value.entities[code] = relationData);

    const changes = {
      value: { ...value }
    };
    return adapter.updateOne(
      {
        id: id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
/**
 * Find the entity from the state according to the privided screen
 * id that can aggregate parent screens such as: 908033,345454
 * @param payload
 * @param state
 */
function findScreen(payload: any, state: any) {
  if (payload.targetCtx.ids) {
    return payload.targetCtx.ids.split(',').filter(id => state.entities[id]);
  }
  return payload.targetCtx.screenId;
}
/**
 * Update the all value of a relation for the owner screen
 * @param state
 * @param payload
 * @param relation
 * @param adapter
 */
export function updateRelation<T>(
  state: any,
  payload: any,
  relation: string,
  adapter: EntityAdapter<ScreenState<T>>
) {
  const id = payload.targetCtx.rootId;
  if (state.entities[id]) {
    const value = { ...state.entities[id].value };
    value[relation] = getPayloadValue(payload.value);
    const changes = {
      value: { ...value }
    };
    return adapter.updateOne(
      {
        id: id,
        changes: changes
      },
      state
    );
  } else {
    return state;
  }
}
export function getPayloadValue(value) {
  delete value['payload'];
  delete value['targetCtx'];
  return value;
}
export function getTemporaryCode() {
  return 'TEMP_' + crypto.getRandomValues(new Uint32Array(1));
}
export function removeTemporaryCode(item: any) {
  let newObj = item instanceof Array ? [...item] : { ...item };
  if (newObj instanceof Array) {
    newObj = newObj.map(data => {
      return removeCodeProperty(data);
    });
  } else {
    return removeCodeProperty(newObj);
  }
}
/**
 * Remove the code property for new object created client side
 * @param item
 */
function removeCodeProperty(item: any) {
  if (item.code && item.code.startsWith('TEMP')) {
    delete item.code;
  }
  return item;
}

export function getValueByCode(value, code, roleName?) {
  return value instanceof Array
    ? value.filter(element => {
      return element.code === code;
    })[0]
    : value[roleName];
}

/**
 *  Update the whole value by the provided page's data

 */
export function getVirtualLazyValue(state, payload) {
  const currentState = state.entities[payload.id];
  const data = payload.value;
  let currentValue = currentState ? [...currentState.value] : [];
  if (isEmpty(currentValue) || currentState.totalItems !== currentValue.length) {
    currentValue = currentState ? Array.from({ length: currentState.totalItems }) : [];
  }
  const startIndex = (payload.vars.page - 1) * payload.vars.size;
  Array.prototype.splice.apply(currentValue, [...[startIndex, payload.vars.size], ...data]);
  const changes = {
    value: [...currentValue],
    loading: false,
    vars: {
      ...payload.vars,
      size: payload.vars.size,
      page: payload.vars.page,
    }
  };
  return {
    id: payload.id,
    changes: changes
  }
}
/**
 *  Update the whole value by the provided page's data in card view

 */
 export function getVirtualLazyCardsValue(state, payload) {
  const currentState = state.entities[payload.id] ? state.entities[payload.id] : []
  const cardsPerRow = virtualScrollUtils.getNumberOfCardsPerRow(payload.rowsCols);
  const rowsPerPage = payload.vars.size/cardsPerRow;
  const data = virtualScrollUtils.generateDataChunk(payload.value,cardsPerRow);
  let currentValue = currentState.value ? [...currentState.value] : []
  if (isEmpty(currentValue)) {
    currentValue = Array.from({ length: Math.round(currentState.totalItems / rowsPerPage)});
    currentValue = currentValue.map(item=> {
      return virtualScrollUtils.getEmpty(cardsPerRow)
    })
  }
  const startIndex = (payload.vars.page - 1) * (payload.vars.size / rowsPerPage);
  Array.prototype.splice.apply(currentValue, [...[startIndex, rowsPerPage], ...data]);
  const changes = {
    value: [...currentValue],
    loading: false,
    vars: {
      ...payload.vars,
      size: payload.vars.size,
      page: payload.vars.page,
    }
  };
  return {
    id: payload.id,
    changes: changes
  }
}
/**
 *  Update the whole collection after change event on editable column or just an item
*/
export function updateEventValue<T>(state,payload,  adapter: EntityAdapter<ScreenState<T>>  ) {
  let newValue = state['entities'][payload.id] ? state['entities'][payload.id].value : []
  if (payload.value instanceof Array) {
    newValue = payload.value
  } else {
    newValue[payload.rowIndex] = payload.value
  }
  const changes = {
    value: newValue,
    loading: false,
  }
  return adapter.updateOne(
    {
      id: payload.id,
      changes: changes,
    },
    state
  )
}
