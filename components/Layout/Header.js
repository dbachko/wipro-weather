/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';
import fetchForecast from '../../core/api'

class Header extends React.Component {

  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
    window.componentHandler.upgradeElement(this.root);
    // Focus on input field on page load
    if (this.refs.city !== null) {
      this.refs.city.focus();
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
    window.componentHandler.downgradeElements(this.root);
  }

  inputSubmit() {
    const { store } = this.context;
    const { state } = store.getState();

    fetchForecast(this.refs.city.value).then((response) => {
      const { city, list } = response;
      if (city) {
        let name = `${city.name}, ${city.country}`;
        store.dispatch({
          type: 'SET_WEATHER',
          name,
          list,
        });
        this.refs.city.value = name;
        this.refs.city.blur();
      }
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 13 ) {
      return this.inputSubmit();
    }
  }

  render() {
    return (
      <header
        className={`mdl-layout__header mdl-layout__header--transparent ${s.header}`}
        ref={node => (this.root = node)}
      >
        <div className={`mdl-layout__header-row ${s.row}`}>
          <div className="mdl-textfield mdl-js-textfield">
            <input
              className={`mdl-textfield__input ${s.input}`}
              type="text"
              ref="city"
              placeholder="Search by city name..."
              onKeyDown={this.handleKeyDown.bind(this)}
            />
          </div>
          <div className="mdl-layout-spacer"></div>
          <i className={`wi wi-day-sunny ${s.logo} ${s.animSpin}`}></i>
        </div>
      </header>
    );
  }

}

Header.contextTypes = {
  store: React.PropTypes.object
}

export default Header;
