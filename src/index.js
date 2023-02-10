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
      console.log(data);

      if (data.length === 1) {
        clearMarkup();
        renderCardMarkup(data);
      } else {
        clearMarkup();
        if (data.length >= 2 && data.length <= 10) {
          renderListMarkup(data);
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      }
    })
    .catch(error => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
      console.log(error.message);
    });
}
function renderCardMarkup(data) {
  const markup = createCardMarkup(data);
  refs.countryInfo.innerHTML = markup;
  console.log(markup);
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
