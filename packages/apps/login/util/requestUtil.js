import GET_HOST from '../pages/queries/GetHost';

const getHost = client => client.readQuery({ query: GET_HOST, }).hostname.match(/^(?:.*?\.)?(.*)/i)[1];

export { getHost, };
