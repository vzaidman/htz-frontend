import { getMqString, } from '@haaretz/htz-css-tools';
import bps from '../consts/bps';

export default function mqString(query, noMediaPrefix) {
  console.log(
    '%c mqString in theme: ',
    'background: #222; color: #bada55',
    query,
    noMediaPrefix
  );
  return getMqString(bps, query, noMediaPrefix);
}
