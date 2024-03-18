import { fetchCountries } from "/src/fetchCountries.js";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countrySearchBox = document.getElementById("countrySearchBox");
const countyInfoData = document.querySelector(".countryInfo");
const countriesInfoData = document.querySelector(".countriesInfo");
const responseTimeDelay = 300;
const countriesNumberToBeDispl = 10;
const emptyString = "";

countrySearchBox.addEventListener('input', debounce(readCountries, responseTimeDelay));

function readCountries(){ 
    const countryText = countrySearchBox.value.trim();
    
    if (countryText === emptyString) {
        clearData();
        Notify.info("Empty string entered. Please enter a more specific name.");
        console.log("Empty string entered");
        countrySearchBox.value = emptyString;
        return;
    }
    
    fetchCountries(countryText)
        .then(res => {
            console.log(res);
            if (res.length <= countriesNumberToBeDispl) {
                clearData();
                displCountries(res);
            }
            else {
                Notify.info("Too many matches found. Please enter a more specific name.");
                clearData();
                return;
            }
    })
        .catch(err => {
            clearData();
            Notify.failure("Oops, there is no country with that name");
        })
};

const displCountries = res => {
    if (res.length === 1) {
        console.log("Single country found");
        const countryItem = createCountryItem(res);
        countyInfoData.innerHTML = countryItem;
    }
    else {
        console.log("More than 1 country found");
        const countryItems = createCountriesItems(res);
        countriesInfoData.innerHTML = countryItems;
    }

}

function clearData () {
    countyInfoData.innerHTML = emptyString;
    countriesInfoData.innerHTML = emptyString;
}

const createCountryItem = res => {
    console.log("Single country added");
    return res.map(  
        ({ name, capital, population, flags, languages }) => 
        `<h1><img src=${flags.png} alt=${name.official} width="60" height="40"> ${name.official}</h1>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Population:</strong> ${population}</p>
        <p><strong>Languages:</strong> ${Object.values(languages)}</p>
        `
    )};

const createCountriesItems = res => {
    console.log("Countries added");
    return res.map( 
        ({ name, flags }) => 
        `<li><img src=${flags.png} alt=${name.official} width="60" height="40"> ${name.official}</li>`
    ).join(emptyString);
};