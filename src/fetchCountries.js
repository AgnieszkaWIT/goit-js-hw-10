const COUNTRIES_URL = "https://restcountries.com/v3.1/name/";
const COUNTRIES_FIELDS = "?fields=name,capital,population,flags,languages";

export function fetchCountries(name) {
    fetch(`${COUNTRIES_URL}${name}${COUNTRIES_FIELDS}`)
        .then(res => {
            console.log(`${COUNTRIES_URL}${name}${COUNTRIES_FIELDS}`);
            return res.json();
        }) 
};