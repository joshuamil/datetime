import 'whatwg-fetch';

let getWeather = () => {

  let storage = localStorage;
  let city = storage.getItem('weather:city') || 'Charlotte';
  let apiKey = 'cc97bdb0c6bbca4eb4160a921cbc9099';
  let cached = storage.getItem(`weather:${city}`);

  let search = getUrlParams();
  let bust = ((search.bust && search.bust !== 0) || arguments[0] === 'bust')? true : false;

  if(cached && cached.length > 0 && !bust) {

    return Promise.all([
      {status: 200}, JSON.parse(cached)
    ]);

  } else {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
      .then((res) => {
        return Promise.all([
          res, res.json()
        ]);
      })
      .then(([res, json]) => {
        storage.setItem(`weather:${city}`,JSON.stringify(json));
        return Promise.all([
          res, json
        ]);
      })
      .catch((e) => {
        console.error(e);
      });
  }


};


let getUrlParams = () => {
  let search = window.location.search;
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  let params = {}
  hashes.map(hash => {
    let [key, val] = hash.split('=')
    params[key] = decodeURIComponent(val)
  });
  return params;
};


export let renderWeather = () => {

  let storage = localStorage;

  let icon = document.querySelector('.weather .icon');
  let temp = document.querySelector('.weather .temp');
  let cond = document.querySelector('.weather .condition');
  let humd = document.querySelector('.weather .humidity');
  let wind = document.querySelector('.weather .wind');

  let city = document.querySelector('#city');
  let cit2 = city.cloneNode(true);
	city.parentNode.replaceChild(cit2, city);
  cit2.addEventListener('blur', (event) => {
    storage.setItem('weather:city', cit2.value);
    cit2.value = cit2.value;
    renderWeather('bust');
  });

  cit2.value = storage.getItem('weather:city');

  let weather = getWeather()
    .then(([res, json]) => {
      icon.innerHTML = `<img src="http://openweathermap.org/img/w/${json.weather[0].icon}.png" alt="${json.weather[0].description}" />`;
      temp.innerHTML = `${json.main.temp}&deg; F`;
      cond.innerHTML = `${json.weather[0].main}`;
      humd.innerHTML = `Humidity: ${json.main.humidity}%`;
      wind.innerHTML = `Wind: ${json.wind.speed} KN`;
    });

};
