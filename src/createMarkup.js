export { createCardMarkup, createListMarkup } 

function createCardMarkup(data) {
  const { name, capital, population, flags, languages } = data[0];
  const languagesOfCountry = Object.values(languages).join('');
  return ` <div class="country-info">
      <img width="70px" hieght="40px" src="${flags.svg}" >
      <h1>${name.official}</h1>
      <p>Capital: ${capital}</p>
      <p>Language: ${languagesOfCountry}</p>
      <p>Population: ${population}</p>
    </div>`;
}

 function createListMarkup({ flags, name }) {
  return `<li class="country-list">
      <img width="50px" hieght="40px" src="${flags.svg}" > 
      <p class="name-country">${name.official}</p>
     
    </li>`;
}


