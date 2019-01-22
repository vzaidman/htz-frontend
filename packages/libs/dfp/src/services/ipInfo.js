/* global fetch localStorage */

const storageKey = 'country';


async function fetchCountry() {
  const res = await fetch('https://ipinfo.io', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await res.json();
  return data.country;
}


export function getCountry() {
  let country = null;
  try {
    country = localStorage.getItem(storageKey);
    // if not already stored, fetch and store for next time
    if (country == null) {
      fetchCountry()
        .then(fetchedCountry => {
          localStorage.setItem(storageKey, fetchedCountry);
        });
    }
  }
  catch (error) {
    // fails silently
  }
  return country;
}
