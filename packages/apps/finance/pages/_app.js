import { createApp, } from '@haaretz/htz-components';
import { withData, } from '@haaretz/app-utils';

const initialState = () => ({});
export default withData(createApp(), initialState);
