import BenderMock from './listMocks/BenderMock';
import DefaultMock from './listMocks/DefaultMock';
import FarnsworthMock from './listMocks/FarnsworthMock';
import GamalMock from './listMocks/GamalMock';
import HawkingMock from './listMocks/HawkingMock';
import LeonardoMock from './listMocks/LeonardoMock';
import MomMock from './listMocks/MomMock';
import PanucciMock from './listMocks/PanucciMock';
import SlimMock from './listMocks/SlimMock';
import SlugsMock from './listMocks/SlugsMock';
import WongMock from './listMocks/WongMock';
import ZappMock from './listMocks/ZappMock';
import ZoidbergMock from './listMocks/ZoidbergMock';
import ZombieMock from './listMocks/ZombieMock';
import VogelMock from './listMocks/VogelMock';
import PazuzuMock from './listMocks/PazuzuMock';

export default (root, { listId, }) => {
  switch (listId) {
    case 'Bender':
      return BenderMock;
    case 'Farnsworth':
      return FarnsworthMock;
    case 'Gamal':
      return GamalMock;
    case 'Hawking':
      return HawkingMock;
    case 'Leela':
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
      return ZoidbergMock;
    case 'Zombie':
      return ZombieMock;
    case 'Vogel':
      return VogelMock;
    case 'Pazuzu':
      return PazuzuMock;
    // Conrad and Wong are almost identical and have the same data
    case 'Conrad':
    case 'Wong':
      return WongMock;
    default:
      return DefaultMock;
  }
};
