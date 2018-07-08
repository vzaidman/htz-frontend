import breakUrl from './breakUrl';

export default function switchToDomain(fqdnToReplace, service) {
  const { domain, } = breakUrl(service);
  const { domain: newDomain, } = breakUrl(fqdnToReplace);
  return service.replace(domain, newDomain);
}
