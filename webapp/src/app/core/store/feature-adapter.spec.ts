import {
  cancelLoading, enableChildrenLoading, getVirtualLazyCardsValue, getVirtualLazyValue,
  initValueEntities, updateEventValue, removeTemporaryCode,
  updateFieldPossibleValues, getPayloadValue, getTemporaryCode,
  updateOneRelationItems,
  updatePropertyValue
} from "./feature-adapter";

class mockAdapter {
  updateOne(changes: any, state: any) {
    return changes;
  }
}

describe("Feature Adapter", () => {

  const state = { entities: { "100": { value: {} }, "200": { value: {} } } };
  const payloadWithCodeField = { id: 100, result: [{ code: 10, name: "test" }] };
  const payloadWithIdField = { id: 200, result: [{ id: 20, name: "test with id" }] };
  const adapter: any = new mockAdapter();
  const payloadChart = {
    id: "1gem8i9av",
    loading: false,
    state: {},
    workSpaceId: "charts",
    ctx: { "feature": "Charts", "screenType": "LineChart", "screenId": "1gem8i9av" },
    vars: { keys: "", index: "" },
    keys: "",
    data: {},
    targetCtx: { rootId: "100" },
    type: "[Charts lineChart] Init Value Success",
    possibleValues: [],
    value: '',
    result: {
      "FlatApi": {
        "React": 185134,
        "Vue": 195514,
        "Angular": 80460,
        "Svelte": 57022,
        "Emberjs": 22165,
        "Backbonejs": 27862
      },
    }
  }
  const stateChart = {
    "ids": ["1gem8goqk"],
    "entities": {
      "1gem8goqk": {
        "id": "1gem8goqk",
        "loading": true,
        "state": {},
        "workSpaceId": "charts",
        "type": "[Charts lineChart] Init State"
      }
    }
  };
  describe("initValueEntities", () => {

    it("should return the value of the entity using code field as identifier", () => {
      const result = initValueEntities(state, payloadWithCodeField, adapter);
      expect(result.id).toBe(100);
      expect(result.changes.value.entities).toEqual({ 10: { code: 10, name: "test" } });
    });

    it("should return the value of the entity using id field as identifier", () => {
      const result = initValueEntities(state, payloadWithIdField, adapter);
      expect(result.id).toBe(200);
      expect(result.changes.value.entities).toEqual({ 20: { id: 20, name: "test with id" } });
    });
    it('should update possible field Values ', function () {
      expect(updateFieldPossibleValues(state, "100", payloadChart, adapter)).toBeTruthy()
    });
    it('should update property value', function () {
      expect(updatePropertyValue(state, payloadChart, adapter, true)).toBeTruthy()
    });
    it('should cancel loading', function () {
      expect(cancelLoading(state, payloadChart, adapter)).toBeTruthy()
    });
    it('should update one relation items', function () {
      expect(updateOneRelationItems(state, payloadChart, adapter)).toBeTruthy()
    });
    it('should enable children loading', function () {
      expect(enableChildrenLoading(state, "chart", payloadChart, adapter)).toBeTruthy()
    });
    it('should get virtual lazy cards value ', function () {
      expect(getVirtualLazyCardsValue(state, payloadChart)).toBeTruthy()
    });
    it('should update event value ', function () {
      expect(updateEventValue(state, payloadChart, adapter)).toBeTruthy()
    });
    it(' should get virtual lazy value ', function () {
      expect(getVirtualLazyValue(state, payloadChart)).toBeTruthy()
    });

  });
});
