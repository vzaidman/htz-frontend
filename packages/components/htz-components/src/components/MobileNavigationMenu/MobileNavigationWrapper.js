import React from 'react';
import PropTypes from 'prop-types';
import { FelaComponent, } from 'react-fela';
import { borderBottom, } from '@haaretz/htz-css-tools';
import MobileNavigation from './MobileNavigationMain';
import MastheadLogo from '../Masthead/MastheadLogo';
import LayoutContainer from '../PageLayout/LayoutContainer'; // eslint-disable-line import/no-named-as-default

export default class MobileNavigationWrapper extends React.Component {
  static propTypes = {
    /**
     * The scroll speed and direction (Y axis), as brought to us by: [`Scroll`](./#scroll)
     */
    contentId: PropTypes.string.isRequired,
    velocity: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    velocity: 0,
    y: 0,
  };

  state = { shouldDisplay: true, };

  componentWillReceiveProps(nextProps) {
    // eslint-disable-next-line react/no-will-update-set-state
    this.setState({ shouldDisplay: !this.state.shouldDisplay, });
  }

  shouldComponentUpdate(nextProps) {
    return (
      (nextProps.velocity < 0 && this.state.shouldDisplay) ||
      (nextProps.velocity > 0 && !this.state.shouldDisplay) ||
      (nextProps.y === 0 && !this.state.shouldDisplay)
    );
  }

  render() {
    const { contentId, } = this.props.contentId;
    const { shouldDisplay, } = this.state;

    return (
      <FelaComponent
        style={theme => ({
          display: 'flex',
          width: '100%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        })}
        render={({ className, theme, }) => (
          <div className={className}>
            <LayoutContainer
              miscStyles={{
                backgroundColor: theme.color('neutral', '-10'),
                ...borderBottom(
                  '1px',
                  0,
                  'solid',
                  theme.color('mastheadBorder', 'borderColor')
                ),
                display: 'flex',
                paddingBottom: '1rem',
                paddingTop: '1rem',
                position: 'fixed',
                start: '50%',
                top: '0',
                transform: `translate(50%, ${shouldDisplay ? '0' : '-100'}%)`,
                transitionProperty: 'transform',
                width: '100%',
                zIndex: theme.getZIndex('modal', 1),
                ...theme.getDelay('transition', -1),
                ...theme.getDuration('transition', -1),
                ...theme.getTimingFunction('transition', 'linear'),
              }}
            >
              <MastheadLogo />
            </LayoutContainer>
            <LayoutContainer
              miscStyles={{
                backgroundColor: 'transparent',
                transform: `translate(50%, ${shouldDisplay ? '0' : '100'}%)`,
                transitionProperty: 'transform',
                position: 'fixed',
                start: '50%',
                bottom: '0',
                width: '100%',
                zIndex: theme.getZIndex('modal', 1),
                ...theme.getDelay('transition', -1),
                ...theme.getDuration('transition', -1),
                ...theme.getTimingFunction('transition', 'linear'),
              }}
            >
              <MobileNavigation contentId={contentId} />
            </LayoutContainer>
          </div>
        )}
      />
    );
  }
}
