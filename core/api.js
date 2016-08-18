/**
 * API for openweathermap
 */

const baseUrl = 'http://api.openweathermap.org/data/2.5/forecast';
const appid = '1ca57754955adb45edc2b8a855684429';

export default function fetchForecast(city, units = 'imperial') {
  const url = `${baseUrl}?appid=${appid}&q=${city}&units=${units}`;

  return fetch(url).then((response) => response.json());
}
