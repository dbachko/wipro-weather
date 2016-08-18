/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import moment from 'moment';
import _ from 'lodash';
import Layout from '../../components/Layout';
import Day from '../../components/Day';
import CurrentWeather from '../../components/CurrentWeather';
import wi from '../../public/icons.json';
import s from './styles.css';
import { title } from './index.md';


class HomePage extends React.Component {

  static propTypes = {
    forecast: PropTypes.object.isRequired,
  };

  componentDidMount() {
    document.title = title;
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getWeatherIcon(data) {
    const prefix = 'wi wi-';
    const code = data.weather[0].id;
    const hour = moment.unix(data.dt).format('H');
    let icon = wi[code].icon;

    // If we are not in the ranges mentioned above, add a day/night prefix.
    if (!_.inRange(code, 699, 801) && !_.inRange(code, 899, 1000)) {
      icon = _.inRange(hour, 6, 20) ? `day-${icon}` : `night-${icon}`;
    } else if (code === 800) {
      icon = _.inRange(hour, 6, 20) ? 'day-sunny' : 'night-clear';
    }

    return prefix + icon;
  }

  getMinMaxTemp(day) {
    return {
      min: ~~_.minBy(day, 'main.temp_min').main.temp_min,
      max: ~~_.maxBy(day, 'main.temp_max').main.temp_max,
    };
  }

  chunkIntoWeekdays(list) {
    return [1, 2, 3, 4, 5].map((idx) => {
      const tmpDay = moment().add(idx, 'days').date();
      return list.map((el) => {
        if (tmpDay === moment(el.dt_txt).date()) {
          return el;
        }
      }).filter(n => n);
    });
  }

  render() {
    const { store } = this.context;
    const { list } = store.getState();
    const curWeather = list ? list[0] : null;
    return (
      <Layout className={s.content}>
        {curWeather ?
          <CurrentWeather
            temp={~~curWeather.main.temp}
            icon={this.getWeatherIcon(curWeather)}
            desc={curWeather.weather[0].description}
            humidity={curWeather.main.humidity}
            pressure={curWeather.main.pressure}
          />
        : null}
        <div className={`${s.dayWrapper}`}>
          {list ? this.chunkIntoWeekdays(list).map((itm) =>
            <Day
              key={itm[4].dt}
              temp={this.getMinMaxTemp(itm)}
              icon={this.getWeatherIcon(itm[4])}
              desc={itm[4].weather[0].description}
              weekday={moment.unix(itm[4].dt).format('dddd')}
            />
          ) : null}
        </div>
      </Layout>
    );
  }

}


HomePage.contextTypes = {
  store: React.PropTypes.object,
};


export default HomePage;
