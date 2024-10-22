import { extendElementClassWithReactiveElementClass } from "./ReactiveElement.js";
import StateManager from "./StateManager.js";
import { doUpdateDOM } from "./node_actions.js";
import { GLOBAL_STATE_VAR_NAME, GLOBAL_STATE_FUNCTION_NAME, HTML_ELEMENTS_CLASSES_MAP } from "./consts.js";
import SproutBuild from '../build';
import { putObjectInDebugMode } from "./debug_utils.js";
import { DEBUG_MODE } from "./consts.js";

const allowAppScopeAccess = document.currentScript.hasAttribute("allowappscopeaccess");

globalThis.SproutInitApp = function(appName) {
    
    let appScope = (function() { return { window, document: window?.document }})(window);

    /*
    if (DEBUG_MODE) {
        appScope = putObjectInDebugMode(appScope, "appScope");
    }
    else {
        Object.defineProperty(globalThis, "appScope", {
            value: appScope,
            writable: false
        })
    }
    */
    const config = {
        useShadow: true, // Always use shadow DOM for now, may add configurability later
        allowAppScopeAccess: allowAppScopeAccess
    }

    if (config.allowAppScopeAccess) {
        Object.defineProperty(globalThis, "sproutApps", {
            value: {},
            writable: false
        });
        Object.defineProperty(globalThis.sproutApps, appName, {
            value: appScope,
            writable: false
        });
        
    }

    appScope.SPROUT_CONFIG = Object.seal(config);

    // Prevent "hasOwnProperty" shenanigans
    const hasOwnProperty = Object.prototype.hasOwnProperty;
    Object.defineProperty(Object.prototype, "hasOwnProperty", {
        value: hasOwnProperty,
        configurable: false,
        writable: false,
        enumerable: false
    });

    appScope[GLOBAL_STATE_FUNCTION_NAME] = function() {
        return {};
    }
    // If initialState is passed - also sets it to global state
    appScope.setGlobalState = function(initialState = {}) {
        const globalState =  new StateManager(initialState, undefined, undefined, true, appScope).state;
        const globalStateVarName = GLOBAL_STATE_VAR_NAME;
        Object.defineProperty(appScope, globalStateVarName, {
            value: globalState,
            writable: DEBUG_MODE ? true : false,
            configurable: false
        });
        Object.defineProperty(appScope, GLOBAL_STATE_FUNCTION_NAME, {
            value: function() {
                return appScope[globalStateVarName];
            },
        });
    };


    appScope.ReactiveElement = extendElementClassWithReactiveElementClass(HTMLElement, appScope);

    // Extend specific HTMLElement classes to enable reactivity (use it by adding an "is" attribute to an element)
    HTML_ELEMENTS_CLASSES_MAP.forEach(itemDefinition => 
        customElements.define(
            `reactive-${itemDefinition.element}`, 
            extendElementClassWithReactiveElementClass(itemDefinition.class, appScope, true),
            { extends: itemDefinition.element })
        
    );

    return function() {
        SproutBuild(appScope, appName);
        requestAnimationFrame(doUpdateDOM);
    }.bind(appScope);
}



