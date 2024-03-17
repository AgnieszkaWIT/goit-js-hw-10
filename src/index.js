import { fetchCountries } from "/src/fetchCountries.js";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const countrySearchBox = document.getElementById("countrySearchBox");
const countyInfoData = document.querySelector(".countryInfo");

countrySearchBox.addEventListener('input', debounce(displCounties, 500));

function displCounties(){ 
    const countryText = countrySearchBox.value.trim();
    
    if (countryText === '') {
        countyInfoData.innerHTML = "";
        console.log("Pusty_string");
        return;
    }

    const zzz = fetchCountries(countryText)
        //.then(countryData => console.log(countryData))
    console.log(zzz);
};