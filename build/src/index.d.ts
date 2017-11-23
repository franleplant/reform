import * as types from "./types";
import * as core from "./core";
import validators from "./validators";
import * as reactHelpers from "./reactHelpers";
import * as reactMixins from "./reactMixins";
export { types, core, validators, reactHelpers, reactMixins };
/**
 *  `default` export for the entire library.
 *
 *  ```javascript
 *  // using the default export
 *  import Reform from '@franleplant/reform'
 *
 *  // importing only the needed parts
 *  import { reactMixins } from '@franleplant/reform'
 *
 *  ```
 *
 */
declare const Reform: {
    types: typeof types;
    core: typeof core;
    validators: {
        get(key: string): types.Validator;
        set(key: string, value: types.Validator): void;
    };
    reactHelpers: typeof reactHelpers;
    reactMixins: typeof reactMixins;
};
export default Reform;
