import React from 'react';
// import matchMediaPolyfill from 'mq-polyfill';

import felaSnapshotter from '../../../test-helpers/felaSnapshotter';
// import {
//   felaMount,
//   felaShallow,
// } from '../../../test-helpers/felaEnzymeRenderers';
/* eslint-disable import/no-named-as-default */
import ButtonGroup from '../ButtonGroup';
import Button from '../Button';
/* eslint-enable import/no-named-as-default */

describe('<ButtonGroup>', () => {
  describe('DOM element', () => {
    it('pass and spread the attrs prop', () => {
      const { component, } = felaSnapshotter(
        <ButtonGroup attrs={{ tabIndex: '-1', }}>
          <Button>click</Button>
          <Button>click</Button>
        </ButtonGroup>
      );
      expect(component).toMatchSnapshot();
    });

    it('render the id prop', () => {
      const { component, } = felaSnapshotter(
        <ButtonGroup id="testId">
          <Button>click</Button>
          <Button>click</Button>
        </ButtonGroup>
      );
      expect(component).toMatchSnapshot();
    });
  });
  it('renders a group in column layout', () => {
    const { component, styles, } = felaSnapshotter(
      <ButtonGroup isColumn>
        <Button>click</Button>
        <Button>click</Button>
        <Button>click</Button>
      </ButtonGroup>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('renders a group in row layout by default', () => {
    const { component, styles, } = felaSnapshotter(
      <ButtonGroup>
        <Button>click</Button>
        <Button>click</Button>
        <Button>click</Button>
      </ButtonGroup>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('apply border radius correctly within a row group', () => {
    const { component, styles, } = felaSnapshotter(
      <ButtonGroup>
        <Button isRound>click</Button>
        <Button isRound>click</Button>
        <Button isRound>click</Button>
      </ButtonGroup>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  it('apply border radius correctly within a column group', () => {
    const { component, styles, } = felaSnapshotter(
      <ButtonGroup isColumn>
        <Button isRound>click</Button>
        <Button isRound>click</Button>
        <Button isRound>click</Button>
      </ButtonGroup>
    );
    expect(component).toMatchSnapshot();
    expect(styles).toMatchSnapshot();
  });

  // describe('responsive changes', () => {
  //   matchMediaPolyfill(window);
  //   window.resizeTo = resizeTo;
  //
  //   it('Change layout direction on different breakpoints', () => {
  //     const MountedButtonGroup = felaMount(
  //       <ButtonGroup
  //         isColumn={{
  //           onServerRender: true,
  //           queries: [
  //             { until: 's', value: false, },
  //             { from: 's', until: 'l', value: false, },
  //             { from: 'l', until: 'xl', value: true, },
  //             { from: 'xl', value: false, },
  //           ],
  //         }}
  //       >
  //         <Button>First</Button>
  //         <Button>Second</Button>
  //         <Button>Last</Button>
  //       </ButtonGroup>
  //     );
  //
  //     // Should be "isColumn" until "s"
  //     window.resizeTo(320, 480);
  //     MountedButtonGroup.find('styles').forEach(node => {
  //       expect(node.prop('isColumn')).toEqual(false);
  //     });
  //
  //     // Should not be "isColumn" from "s" until "l"
  //     window.resizeTo(601, 480);
  //     ButtonGroup.find('styles').forEach(node => {
  //       expect(node.prop('isColumn')).toEqual(false);
  //     });
  //
  //     // Should be "isColumn" from "l" until "xl"
  //     window.resizeTo(1100, 768);
  //     ButtonGroup.find('styles').forEach(node => {
  //       expect(node.prop('isColumn')).toEqual(true);
  //     });
  //     // Should not be "isColumn" from "xl"
  //     window.resizeTo(1600, 1100);
  //     ButtonGroup.find('styles').forEach(node => {
  //       expect(node.prop('isColumn')).toEqual(false);
  //     });
  //   });
  // });
});

// function resizeTo(width, height) {
//   Object.assign(this, {
//     innerWidth: width,
//     innerHeight: height,
//     outerWidth: width,
//     outerHeight: height,
//   }).dispatchEvent(new this.Event('resize'));
