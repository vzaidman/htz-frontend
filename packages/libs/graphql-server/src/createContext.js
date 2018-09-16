import config from 'config';
import { switchToDomain, } from '@haaretz/app-utils';
import Cookies from 'universal-cookie';

export default function createContext(headers) {
  const polopolyPromotionsPage = config.has('polopolyPromotionsPagePath')
    ? config.get('polopolyPromotionsPagePath')
    : 'promotions-page-react';
  const hostname = headers.hostname;
  const ssoService = config.get('service.sso');
  const serviceBase = switchToDomain(hostname, config.get('service.base'));
  const cookies = headers ? new Cookies(headers.cookie) : null;
  const preview = headers.preview;
  return {
    headers,
    ssoService,
    serviceBase,
    cookies,
    polopolyPromotionsPage,
    preview,
  };
}
