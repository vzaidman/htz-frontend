import React from 'react';
import { Debug, } from '@haaretz/htz-components';

import Beavis from './views/Beavis/Beavis';
import Bender from './views/Bender/Bender';
import Boxy from './views/Boxy/Boxy';
import Butthead from './views/Butthead/Butthead';
import Calculon from './views/Calculon/Calculon';
import Conrad from './views/Conrad/Conrad';
import Donatello from './views/Donatello/Donatello';
import Donbot from './views/Donbot/Donbot';
import Farnsworth from './views/Farnsworth/Farnsworth';
import Hawking from './views/Hawking/Hawking';
import Gamal from './views/Gamal/Gamal';
import Kroker from './views/Kroker/Kroker';
import Leela from './views/Leela/Leela';
import Leonardo from './views/Leonardo/Leonardo';
import Michelangelo from './views/Michelangelo/Michelangelo';
import Mom from './views/Mom/Mom';
import Mousepad from './views/Mousepad/Mousepad';
import Morbo from './views/Morbo/Morbo';
import Panucci from './views/Panucci/Panucci';
import Pazuzu from './views/Pazuzu/Pazuzu';
import Slim from './views/Slim/Slim';
import Slugs from './views/Slugs/Slugs';
import Spawn from './views/Spawn/Spawn';
import Wong from './views/Wong/Wong';
import Zapp from './views/Zapp/Zapp';
import Zoidberg from './views/Zoidberg/Zoidberg';
import Zombie from './views/Zombie/Zombie';
import Vogel from './views/Vogel/Vogel';

export default function DynamicListView(props) {
  const view = props.listData.view;
  switch (view) {
    case 'Beavis': {
      return <Beavis {...props} />;
    }
    case 'Bender': {
      return <Bender {...props} />;
    }
    case 'Boxy': {
      return <Boxy {...props} />;
    }
    case 'Butthead': {
      return <Butthead {...props} />;
    }
    case 'Calculon': {
      return <Calculon {...props} />;
    }
    case 'Conrad': {
      return <Conrad {...props} />;
    }
    case 'Donatello': {
      return <Donatello {...props} />;
    }
    case 'Donbot': {
      return <Donbot {...props} />;
    }
    case 'Gamal': {
      return <Gamal {...props} />;
    }
    case 'Farnsworth': {
      return <Farnsworth {...props} />;
    }
    case 'Hawking': {
      return <Hawking {...props} />;
    }
    case 'Kroker': {
      return <Kroker {...props} />;
    }
    case 'Leela': {
      return <Leela {...props} />;
    }
    case 'Leonardo': {
      return <Leonardo {...props} />;
    }
    case 'Michelangelo': {
      return <Michelangelo {...props} />;
    }
    case 'Mom': {
      return <Mom {...props} />;
    }
    case 'Morbo': {
      return <Morbo {...props} />;
    }
    case 'Mousepad': {
      return <Mousepad {...props} />;
    }
    case 'Panucci': {
      return <Panucci {...props} />;
    }
    case 'Pazuzu': {
      return <Pazuzu {...props} />;
    }
    case 'Slim': {
      return <Slim {...props} />;
    }
    case 'Slugs': {
      return <Slugs {...props} />;
    }
    case 'Spawn': {
      return <Spawn {...props} />;
    }
    case 'Wong': {
      return <Wong {...props} />;
    }
    case 'Zapp': {
      return <Zapp {...props} />;
    }
    case 'Zoidberg': {
      return <Zoidberg {...props} />;
    }
    case 'Zombie': {
      return <Zombie {...props} />;
    }
    case 'Vogel': {
      return <Vogel {...props} />;
    }
    default:
      return <Debug>{`${view} is not supported view`}</Debug>;
  }
}
