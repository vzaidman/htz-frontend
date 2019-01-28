/* global fetch */
// @flow
// eslint-disable-next-line no-return-await
const fetchLeagues: string => Object = async league => await (await fetch(`http://docker.themarker.com:8140/football/leagues/${league}`)
  .then(response => {
    const contentType: ?string = response.headers.get('Content-Type'); // -> "text/html; charset=utf-8"

    if (/text\/plain/i.test(contentType || '')) {
      return response.text();
    }
    if (/application\/json/.test(contentType || '')) {
      return response.json();
    }
    return null;
  })
  .catch(error => {
    console.log(error);
  }));

// eslint-disable-next-line no-return-await
const fetchGroups: number => Object = async group => await fetch(`http://docker.themarker.com:8140/football/champions/${group}`)
  .then(response => {
    const contentType: ?string = response.headers.get('Content-Type'); // -> "text/html; charset=utf-8"

    if (/text\/plain/i.test(contentType || '')) {
      return response.text();
    }
    if (/application\/json/.test(contentType || '')) {
      return response.json();
    }
    return null;
  })
  .catch(error => {
    console.log(error);
  });

export { fetchLeagues, fetchGroups, };
