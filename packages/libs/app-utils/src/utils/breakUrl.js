export default function breakUrl(url) {
  const subdomainRegex = /(https?)?(?::\/\/)?((.+?)\.(.+?))(?!:)(\d{2,5})?(\/.+)?$/gim;
  /*
      [0] - fullMatch. Ex. "http://elia.haaretz.co.il:3000/graphql"
      [1] - Fully Qualified domain name (FQDN). Ex. "elia.haaretz.co.il"
      [2] - protocol (subdomain). Ex. "elia" , "www" , "promotions"
      [3] - hostname (subdomain). Ex. "elia" , "www" , "promotions"
      [4] - domain (root). Ex. "haaretz.co.il" , "themarker.com"
      [5] - port (optional) - Ex: 3000, 2004
      [6] - path (optional) - Ex: /graphql, /papi/.premium-1204
    */

  // eslint-disable-next-line max-len
  const [ fullMatch, protocol, fqdn, hostname, domain, port, path, ] =
    subdomainRegex.exec(url) || [];

  if (!fqdn) {
    console.error(
      `createContext regexResult was null for ${url} - falling back!`
    );
  }
  return { fullMatch, protocol, fqdn, hostname, domain, port, path, };
}
