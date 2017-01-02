import * as types from './types';
import * as core from './core';
import validators from './validators';
import * as reactHelpers from './reactHelpers';
import * as reactMixins from './reactMixins';


export {
  types,
  core,
  validators,
  reactHelpers,
  reactMixins,
};

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
const Reform = {
  types,
  core,
  validators,
  reactHelpers,
  reactMixins,
};

export default Reform;
