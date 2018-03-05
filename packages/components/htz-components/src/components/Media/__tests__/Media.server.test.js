/** @jest-environment node */
import React from 'react';
import Media from '../Media';
import felaSnapshotter from '../../../test-helpers/felaSnapshotter';

describe('<Media /> on server', () => {
  it('does not match on the server by default', () => {
    const { component, } = felaSnapshotter(
      <Media query={{ from: 'l', }}>
        {matches =>
          (matches ? <p>matched on server</p> : <p>did not match on server</p>)
        }
      </Media>
    );
    expect(component).toMatchSnapshot();
  });

  it('match on the server when "matchOnServer" is true', () => {
    const { component, } = felaSnapshotter(
      <Media query={{ from: 'l', }} matchOnServer>
        {matches =>
          (matches ? <p>matched on server</p> : <p>did not match on server</p>)
        }
      </Media>
    );
    expect(component).toMatchSnapshot();
  });
});
