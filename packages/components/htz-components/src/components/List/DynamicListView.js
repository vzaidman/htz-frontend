import React from 'react';
import dynamic from 'next/dynamic';

const Bender = dynamic(() => import('./views/Bender/Bender'), {
  loading: () => null,
});
const Donatello = dynamic(() => import('./views/Donatello/Donatello'), {
  loading: () => null,
});
const Farnsworth = dynamic(() => import('./views/Farnsworth/Farnsworth'), {
  loading: () => null,
});
const Hawking = dynamic(() => import('./views/Hawking/Hawking'), {
  loading: () => null,
});
const Fry = dynamic(() => import('./views/Fry/Fry'), {
  loading: () => null,
});
const Gamal = dynamic(() => import('./views/Gamal/Gamal'), {
  loading: () => null,
});
const Leela = dynamic(() => import('./views/Leela/Leela'), {
  loading: () => null,
});
const Leonardo = dynamic(() => import('./views/Leonardo/Leonardo'), {
  loading: () => null,
});
const Michelangelo = dynamic(() => import('./views/Michelangelo/Michelangelo'), {
  loading: () => null,
});
const Mom = dynamic(() => import('./views/Mom/Mom'), {
  loading: () => null,
});
const Nibbler = dynamic(() => import('./views/Nibbler/Nibbler'), {
  loading: () => null,
});
const Panucci = dynamic(() => import('./views/Panucci/Panucci'), {
  loading: () => null,
});
const Slim = dynamic(() => import('./views/Slim/Slim'), {
  loading: () => null,
});
const Slugs = dynamic(() => import('./views/Slugs/Slugs'), {
  loading: () => null,
});
const Zapp = dynamic(() => import('./views/Zapp/Zapp'), {
  loading: () => null,
});
const Zoidberg = dynamic(() => import('./views/Zoidberg/Zoidberg'), {
  loading: () => null,
});
const Zombie = dynamic(() => import('./views/Zombie/Zombie'), {
  loading: () => null,
});

export default function DynamicListView({ view, ...props }) {
  switch (view) {
    case 'Bender': {
      return <Bender {...props} />;
    }
    case 'Donatello': {
      return <Donatello {...props} />;
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
    case 'Fry': {
      return <Fry {...props} />;
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
    case 'Nibbler': {
      return <Nibbler {...props} />;
    }
    case 'Panucci': {
      return <Panucci {...props} />;
    }
    case 'Slim': {
      return <Slim {...props} />;
    }
    case 'Slugs': {
      return <Slugs {...props} />;
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
    default:
      return <div>non supported list</div>;
  }
}
