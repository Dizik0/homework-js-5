import './styles.css';

import countryCard from './templates/country-card.hbs';
import oneCountry from './templates/one-country.hbs';
const input = document.querySelector('.country-search');
const URL = 'https://restcountries.eu/rest/v2/name/';

const countryMarkup = document.querySelector('.country-markup');
const debounce = require('lodash.debounce');

const takeTheCountry = () => {
  let inputValue = input.value;
  return fetch(`${URL}${inputValue}`)
    .then(value => {
      return value.json();
    })
    .then(rol => renderCountryCard(rol))
    .catch(error => console.log(error));
};
const renderCountryCard = country => {
  const listCountry = countryCard(country);
  const countryBox = oneCountry(country[0]);

  if (country.length <= 1) {
    changingMarkupCountries(countryBox);
    return;
  }
  country.length <= 10
    ? changingMarkupCountries(listCountry)
    : changingMarkupCountries(''),
    onError();
};

const changingMarkupCountries = value => (countryMarkup.innerHTML = value);

input.addEventListener('input', debounce(takeTheCountry, 500));

// ===========

import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/confirm/dist/PNotifyConfirm.css';

function onError() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
  });
}
