import { populateStateFromInitialState } from "./state_utils";
import { StateObjectValueHandler } from "./proxy_handlers";

export function populateInitialState(stateManager, initialState, appScope = window) {
    return populateStateFromInitialState(stateManager, initialState, appScope);
}
export function makeReactive(stateObject, parentStateProp = undefined, appScope = window) {
    return new Proxy(stateObject, StateObjectValueHandler(stateObject, parentStateProp, appScope));
}