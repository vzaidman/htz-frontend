import config from 'config';
import GET_HOST from '../pages/queries/GetHost';

// eslint-disable-next-line no-undef
const sendMailValidation = ({ email, }) => fetch(`${config.get('service.sso')}/sso/r/sendEmailValidation?eid=${encodeURIComponent(email)}`)
  .then(res => res.json())
  .then(
    res => Promise.resolve({ success: res.result === '1', msg: res.msg, }),
    () => Promise.resolve({ success: false, msg: 'server error', })
  );

const getHost = client => client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];

export { sendMailValidation, getHost, };
