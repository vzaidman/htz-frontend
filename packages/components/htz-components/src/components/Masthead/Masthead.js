// @flow
import * as React from 'react';
import { type ComponentPropResponsiveObject, } from '@haaretz/htz-css-tools';
import { FelaComponent, } from 'react-fela';
import HomePageMasthead from './HomePageMasthead';
import ArticlePageMasthead from './ArticlePageMasthead';
import MobileNavigation from '../MobileNavigationMenu/MobileNavigationMain';
// eslint-disable-next-line import/no-named-as-default
import Scroll from '../Scroll/Scroll';

type ColorBaseType = string | [string, ] | [string, string, ];

export type ColorType = ColorBaseType | ComponentPropResponsiveObject<ColorBaseType>[];

type MastheadBaseProps = {
  pageType: string,
  contentId: string,
  logo: React.ElementType,
  rowBgc: ?ColorType,
  containerBgc: ?ColorType,
};

type MastheadProps = MastheadBaseProps & { velocity: number, y: number, };

type State = {
  shouldDisplay: boolean,
  isScrolled: boolean,
};

class Masthead extends React.Component<MastheadProps, State> {
  state = {
    shouldDisplay: true,
    isScrolled: false,
  };

  static defaultProps = {
    rowBgc: null,
    containerBgc: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { velocity, y, } = props;
    const isScrolled = y > 100;
    const shouldDisplay = y < 200 || velocity > 0;

    return { shouldDisplay, isScrolled, };
  }

  render() {
    const { pageType, contentId, } = this.props;
    const { shouldDisplay, isScrolled, } = this.state;
    let MastheadComponent;

    switch (pageType) {
      case 'homepage':
        MastheadComponent = HomePageMasthead;
        break;
      default:
        MastheadComponent = ArticlePageMasthead;
        break;
    }

    return (
      <React.Fragment>
        <MastheadComponent {...this.props} isScrolled={isScrolled} shouldDisplay={shouldDisplay} />
        {/* <FelaComponent
          style={theme => ({
            backgroundColor: 'transparent',
            transform: `translate(50%, ${shouldDisplay ? '0' : '110'}%)`,
            transitionProperty: 'transform',
            position: 'fixed',
            start: '50%',
            bottom: '0',
            width: '100%',
            zIndex: theme.getZIndex('modal', 1),
            display: 'none',
            extend: [
              theme.getDelay('transition', -1),
              theme.getDuration('transition', -1),
              theme.getTimingFunction('transition', 'linear'),
              theme.mq({ until: 's', }, { display: 'initial', }),
              theme.mq({ until: 'm', misc: 'landscape', }, { display: 'initial', }),
            ],
          })}
        >
          <MobileNavigation contentId={contentId} shouldDisplay={shouldDisplay} />
        </FelaComponent> */}
      </React.Fragment>
    );
  }
}

export default function WrappedMasthead(props: MastheadBaseProps): React.Node {
  return <Scroll render={({ velocity, y, }) => <Masthead {...props} velocity={velocity} y={y} />} />;
}
