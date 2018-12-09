import BenderMock from './listMocks/BenderMock';
import DefaultMock from './listMocks/DefaultMock';
import FryMock from './listMocks/FryMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import FarnsworthMock from './listMocks/FarnsworthMock';

export default viewName => {
  switch (viewName) {
    case 'Bender':
      return BenderMock;
    case 'Farnsworth':
      return FarnsworthMock;
    case 'Nibbler':
    case 'Leela':
    case 'Zoidberg':
      return ZoidbergMock;
    case 'Fry':
      return FryMock;
    default:
      return DefaultMock;
  }
};
