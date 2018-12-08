import BenderMock from './listMocks/BenderMock';
import DefaultMock from './listMocks/DefaultMock';
import FryMock from './listMocks/FryMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import FarnsworthMock from './listMocks/FarnsworthMock';
import MomMock from './listMocks/MomMock';

export default (root, { listId, }) => {
  switch (listId) {
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
    case 'Mom':
      return MomMock;
    default:
      return DefaultMock;
  }
};
