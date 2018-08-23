import DFP from './dfp';
import * as dfpTargeting from './targetingParams';
// import { version as v, } from '../package.json';
// const v = require('../package.json').version;

// DFP version is based on the package.json
// DFP.version = v || 'VERSION';

/*
 // Only for development mode
 if ( process.env.NODE_ENV !== 'production' ) {
 DFP.dev = '123';
 }
 */
export default DFP;

export { dfpTargeting, };
