import BenderMock from './listMocks/BenderMock';
import DefaultMock from './listMocks/DefaultMock';
import FarnsworthMock from './listMocks/FarnsworthMock';
import FryMock from './listMocks/FryMock';
import GamalMock from './listMocks/GamalMock';
import MomMock from './listMocks/MomMock';
import SlimMock from './listMocks/SlimMock';
import SlugsMock from './listMocks/SlugsMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import ZombieMock from './listMocks/ZombieMock';
import LeonardoMock from './listMocks/LeonardoMock';

export default (root, { listId, }) => {
  switch (listId) {
    case 'Bender':
      return BenderMock;
    case 'Farnsworth':
      return FarnsworthMock;
    case 'Gamal':
      return GamalMock;
    case 'Nibbler':
    case 'Leela':
    case 'Zoidberg':
      return ZoidbergMock;
    case 'Fry':
      return FryMock;
    case 'Mom':
      return MomMock;
    case 'Slim':
      return SlimMock;
    case 'Slugs':
      return SlugsMock;
    case 'Zombie':
      return ZombieMock;
    case 'Leonardo':
    case 'Donatello':
    case 'Michelangelo':
      return LeonardoMock;
    default:
      return DefaultMock;
  }
};
