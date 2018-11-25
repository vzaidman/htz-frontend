import config from 'config';
import { switchToDomain, } from '@haaretz/app-utils';
import Cookies from 'universal-cookie';

export default function createContext(headers) {
  const polopolyPromotionsPage = config.has('polopolyPromotionsPagePath')
    ? config.get('polopolyPromotionsPagePath')
    : 'promotions-page-react';
  const isDev = process.env.NODE_ENV === 'development';
  const defaultHostname = isDev ? 'local.haaretz.co.il' : headers.hostname;
  const hostname = headers.hostname || defaultHostname; //  when using graphql playground in local env;

  const ssoService = config.get('service.sso');
  const serviceBase = switchToDomain(hostname, config.get('service.base'));
  const cookies = headers ? new Cookies(headers.cookie) : null;
  const preview = headers.preview;
  const previewUserId = headers.previewuserid;
  const previewContentId = headers.previewcontentid;

  return {
    headers,
    ssoService,
    serviceBase,
    cookies,
    polopolyPromotionsPage,
    preview,
    previewContentId,
    previewUserId,
  };
}
