import React from 'react';
import Debug from '../Debug/Debug';

import Beavis from './views/Beavis/Beavis';
import Bender from './views/Bender/Bender';
import Boxy from './views/Boxy/Boxy';
import Butthead from './views/Butthead/Butthead';
import Calculon from './views/Calculon/Calculon';
import Clampazzo from './views/Clampazzo/Clampazzo';
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

const views = new Map([
  [ 'Beavis', Beavis, ],
  [ 'Bender', Bender, ],
  [ 'Boxy', Boxy, ],
  [ 'Butthead', Butthead, ],
  [ 'Calculon', Calculon, ],
  [ 'Clampazzo', Clampazzo, ],
  [ 'Conrad', Conrad, ],
  [ 'Donatello', Donatello, ],
  [ 'Donbot', Donbot, ],
  [ 'Farnsworth', Farnsworth, ],
  [ 'Hawking', Hawking, ],
  [ 'Gamal', Gamal, ],
  [ 'Kroker', Kroker, ],
  [ 'Leela', Leela, ],
  [ 'Leonardo', Leonardo, ],
  [ 'Michelangelo', Michelangelo, ],
  [ 'Mom', Mom, ],
  [ 'Mousepad', Mousepad, ],
  [ 'Morbo', Morbo, ],
  [ 'Panucci', Panucci, ],
  [ 'Pazuzu', Pazuzu, ],
  [ 'Slim', Slim, ],
  [ 'Slugs', Slugs, ],
  [ 'Spawn', Spawn, ],
  [ 'Wong', Wong, ],
  [ 'Zapp', Zapp, ],
  [ 'Zoidberg', Zoidberg, ],
  [ 'Vogel', Vogel, ],
  [ 'Zombie', Zombie, ],
]);

export default function DynamicListView(props) {
  const view = props.listData.view;
  const View = views.get(view);

  return View ? <View {...props} /> : <Debug>{`${view} is not supported view`}</Debug>;
}
