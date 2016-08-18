/**
 * Day component
 */

import React, { PropTypes } from 'react';
import s from './Day.css';

class Day extends React.Component {

  static propTypes = {
    temp: PropTypes.object,
    icon: PropTypes.string,
    desc: PropTypes.string,
    weekday: PropTypes.string,
  };

  render() {
    const { temp, icon, desc, weekday } = this.props;
    return (
      <div className={`${s.wrapper}`}>
        <h5 className={`${s.weekday}`}>{weekday}:</h5>
        <div className={`${s.weatherBlockWrapper}`}>
          <div className={`${s.weatherIconWrapper}`}>
            <i className={`${s.weatherIcon} ${icon}`}></i>
          </div>
          <span className={`${s.desc}`}>{desc}</span>
          <div className={`${s.tempBlock}`}>
            <span className={`${s.temp}`}>
              {temp.min}
              <i className='wi wi-degrees'></i>
            </span>
            {` to `}
            <span className={`${s.temp}`}>
              {temp.max}
              <i className='wi wi-degrees'></i>
            </span>
          </div>
        </div>
      </div>
    );
  }

}

export default Day;
