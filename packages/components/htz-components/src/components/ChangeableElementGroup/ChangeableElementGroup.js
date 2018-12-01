/* global window */
// @flow
import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';

import type { Node, ComponentType, } from 'react';

import getComponent from '../../utils/componentFromInputTemplate';
import ToggleFade from '../Transitions/ToggleFade';

import type { PropTypes, StateTypes, ContentType, } from './types';

class ChangeableElementGroup extends React.Component<PropTypes, StateTypes> {
  state = {
    someoneIsAnimating: false,
    elementIndex: null,
  };

  static getDerivedStateFromProps(nextProps: PropTypes, prevState: StateTypes) {
    const { scrollY, totalDisplay, contentLists, } = nextProps;

    const getElementIndex: () => ?number = () => {
      const posY: number = scrollY % totalDisplay;
      let prev: number = 0;
      for (const [ index, item, ]: [
        number,
        ContentType,
      ] of contentLists.entries()) {
        if (posY > item.displayDuration + prev) {
          prev += item.displayDuration;
        }
        else return index;
      }
      return null;
    };

    const elementIndex: ?number = getElementIndex();

    return elementIndex !== prevState.elementIndex
      ? {
        elementIndex,
      }
      : prevState;
  }

  shouldComponentUpdate(nextProps: PropTypes, nextState: StateTypes) {
    return (
      (!nextState.someoneIsAnimating
        && this.state.someoneIsAnimating !== nextState.someoneIsAnimating)
      || this.state.elementIndex !== nextState.elementIndex
    );
  }

  render(): Node {
    const { contentLists, } = this.props;
    const { elementIndex, someoneIsAnimating, } = this.state;

    return (
      <Fragment>
        {contentLists.map(({ content: element, }, index) => {
          const { properties, ...elementWithoutProperties } = element;
          const Element: ComponentType<any> = getComponent(
            element.inputTemplate
          );
          const show: boolean = elementIndex === index;
          return (
            <FelaComponent
              key={element.contentId}
              style={theme => ({
                transform: `translateY(${show ? '0' : '8'}rem)`,
                transitionProperty: 'transform',
                ...theme.getDuration('transition', 1),
                ...theme.getTimingFunction('transition', 'linear'),
                ...theme.getDelay('transition', 0),
              })}
            >
              <ToggleFade
                show={show && !someoneIsAnimating}
                delay={0}
                durationIn={3}
                durationOut={0}
                render={({ animating, }) => {
                  this.setState({ someoneIsAnimating: animating, });
                  return (
                    <FelaComponent
                      style={{
                        display:
                          !show && !someoneIsAnimating ? 'none' : 'block',
                      }}
                    >
                      <Element {...elementWithoutProperties} {...properties} />
                    </FelaComponent>
                  );
                }}
              />
            </FelaComponent>
          );
        })}
      </Fragment>
    );
  }
}

export default ChangeableElementGroup;
