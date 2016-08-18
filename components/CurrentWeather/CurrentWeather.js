/**
 * CurrentWeather component
 */

import React, { PropTypes } from 'react';
import s from './CurrentWeather.css';

class CurrentWeather extends React.Component {

  static propTypes = {
    temp: PropTypes.number,
    icon: PropTypes.string,
    desc: PropTypes.string,
    humidity: PropTypes.number,
    pressure: PropTypes.number,
  };

  render() {
    const { temp, icon, desc, weekday, humidity, pressure } = this.props;
    return (
      <div className={`${s.wrapper}`}>
        <h5 className="weekday">Right Now:</h5>
        <div className={`${s.weatherBlock}`}>
          <i className={`${s.weatherIcon} ${icon}`}></i>
          <span className={`${s.temp}`}>{temp}</span>
          <i className='wi wi-degrees'></i>
        </div>
        <span className={`${s.desc}`}>{desc}</span>
        <div className="humidity">Humidity: {humidity}%</div>
        <div className="pressure">Pressure: {pressure} hpa</div>
      </div>
    );
  }

}

export default CurrentWeather;
