const BASE_URL = 'https://restcountries.com/v3.1/';
const params = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});

export function fetchCountries(nameOfCountry) {
  return fetch(`${BASE_URL}name/${nameOfCountry}?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
