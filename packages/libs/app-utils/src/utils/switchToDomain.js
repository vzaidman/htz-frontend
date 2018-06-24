import breakUrl from './breakUrl';

export default function switchToDomain(fqdnToReplace, service) {
  const { fqdn, } = breakUrl(service);
  const fqdnFromConfig = fqdn;
  return service.includes(fqdnFromConfig)
    ? service
    : service.replace(fqdnFromConfig, fqdnToReplace);
}
