/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { createStore } from 'redux';

// Centralized application state
const store = createStore((state = {}, action) => {
  switch (action.type) {
    case 'SET_WEATHER':
      return {
        name: action.name,
        list: action.list,
      };
    default:
      return state;
  }
});

export default store;
