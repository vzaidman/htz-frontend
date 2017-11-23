const configure = require('enzyme').configure;
const Adapter = require('enzyme-adapter-react-16');

// React 16 Enzyme adapter
configure({ adapter: new Adapter(), });

// Make Enzyme functions available in all test files without importing
const shallow = require('enzyme').shallow;
const render = require('enzyme').render;
const mount = require('enzyme').mount;

global.shallow = shallow;
global.render = render;
global.mount = mount;
