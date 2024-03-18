export function fetchCountries(name) {
  const COUNTRIES_URL = 'https://restcountries.com/v3.1/name/';
  const COUNTRIES_FIELDS = 'fields=name,capital,population,flags,languages';

  return fetch(`${COUNTRIES_URL}${name}?${COUNTRIES_FIELDS}`).then(res => {
    //console.log(`${COUNTRIES_URL}${name}?${COUNTRIES_FIELDS}`);
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.json();
  }); //.then(res => console.log(res))
}
