import BenderMock from './listMocks/BenderMock';
import DefaultMock from './listMocks/DefaultMock';
import FarnsworthMock from './listMocks/FarnsworthMock';
import FryMock from './listMocks/FryMock';
import GamalMock from './listMocks/GamalMock';
import LeonardoMock from './listMocks/LeonardoMock';
import MomMock from './listMocks/MomMock';
import PanucciMock from './listMocks/PanucciMock';
import SlimMock from './listMocks/SlimMock';
import SlugsMock from './listMocks/SlugsMock';
import ZappMock from './listMocks/ZappMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import ZombieMock from './listMocks/ZombieMock';

export default (root, { listId, }) => {
  switch (listId) {
    case 'Bender':
      return BenderMock;
    case 'Farnsworth':
      return FarnsworthMock;
    case 'Fry':
      return FryMock;
    case 'Gamal':
      return GamalMock;
    case 'Leonardo':
    case 'Donatello':
    case 'Michelangelo':
      return LeonardoMock;
    case 'Mom':
      return MomMock;
    case 'Panucci':
      return PanucciMock;
    case 'Slim':
      return SlimMock;
    case 'Slugs':
      return SlugsMock;
    case 'Zapp':
      return ZappMock;
    case 'Zoidberg':
    case 'Leela':
    case 'Nibbler':
      return ZoidbergMock;
    case 'Zombie':
      return ZombieMock;
    default:
      return DefaultMock;
  }
};
