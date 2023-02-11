import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
import { createCardMarkup, createListMarkup } from './createMarkup.js';
import getRefs from './refs';

const DEBOUNCE_DELAY = 300;

const refs = getRefs();

refs.inputSearchBox.addEventListener(
  'input',
  debounce(onFormSearchInput, DEBOUNCE_DELAY)
);

function onFormSearchInput(e) {
  e.preventDefault();
  const country = e.target.value.trim().toLowerCase();
  if (!country) {
    clearMarkup();
    return;
  }
  fetchCountries(country)
    .then(data => {
      if (data.length === 1) {
        clearMarkup();
        renderCardMarkup(data);
      } else if (data.length >= 2 && data.length <= 10) {
        clearMarkup();
        renderListMarkup(data);
      } else {
        onManyMatchesFound();
      }
    })

    .catch(error => {
      console.log(error.massege);
      onIncorrectInput();
      clearMarkup();
    });
}

function renderCardMarkup(data) {
  const markup = createCardMarkup(data);
  refs.countryInfo.innerHTML = markup;
}
function renderListMarkup(data) {
  data.forEach(country => {
    refs.countryList.insertAdjacentHTML('beforeend', createListMarkup(country));
  });
}

function clearMarkup() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}

function onManyMatchesFound() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function onIncorrectInput() {
  Notify.failure('Oops, there is no country with that name');
}
