export default function getRefs() {
  return (refs = {
    inputSearchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
  });
}
