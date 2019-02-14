// @flow
import * as React from 'react';
import { FelaComponent, } from 'react-fela';
import {
  parseComponentProp,
  parseStyleProps,
  type StyleProps,
  type ComponentPropResponsiveObject,
} from '@haaretz/htz-css-tools';

import LogoAndDate from './LogoAndDate';

type SidesEnum = 'start' | 'end' | 'bottom' | 'sides' | 'all';

const isPanelMached = (panelName, optionName) => {
  if (!optionName) {
    return false;
  }
  const disablePanels = Array.isArray(optionName) ? optionName : [ optionName, ];

  return disablePanels.reduce((result, settings) => {
    if (result) {
      return result;
    }

    switch (panelName) {
      case 'start':
        return !!settings.match(/start|sides|all/);
      case 'end':
        return !!settings.match(/end|sides|all/);
      case 'bottom':
        return !!settings.match(/bottom|all/);
      default:
        return false;
    }
  }, false);
};

const wrapperStyle = ({ theme, miscStyles, }) => ({
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

const headerStyle = () => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const logoWrapperStyle = ({ theme, showLogo, }) => ({
  ...theme.getTransition(1),
  ...(showLogo
    ? {
      visibility: 'visible',
      opacity: 1,
    }
    : {
      visibility: 'hidden',
      opacity: '0',
    }),
});

const panelVisibility = panelName => (prop, hiddenPanels) => (hiddenPanels && isPanelMached(panelName, hiddenPanels)
  ? { display: 'none', }
  : { display: 'flex', });

const panelStyle = ({ theme, isFullWidth, panelName, panelsResponsiveHiding, }) => ({
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'row',
  width: isFullWidth ? '100%' : null,
  extend: [
    parseComponentProp('display', panelsResponsiveHiding, theme.mq, panelVisibility(panelName)),
  ],
});

const startPanelStyle = ({ theme, isFullWidth, panelsResponsiveHiding, }) => ({
  ...panelStyle({ theme, isFullWidth, panelName: 'start', panelsResponsiveHiding, }),
  insetInlineStart: 0,
});

const endPanelStyle = ({ theme, isFullWidth, panelsResponsiveHiding, }) => ({
  ...panelStyle({ theme, isFullWidth, panelName: 'end', panelsResponsiveHiding, }),
  insetInlineEnd: 0,
});

const bottomPanelStyle = ({ theme, panelsResponsiveHiding, }) => ({
  extend: [
    parseComponentProp('display', panelsResponsiveHiding, theme.mq, panelVisibility('bottom')),
  ],
});

type MastheadWrapperProps = {
  /**
   * dont render specific panels.
   */
  disablePanels: ?SidesEnum | SidesEnum[],
  /**
   * dont render date-time element
   */
  disableDatetime: ?boolean,
  /**
   * configures hiding of panels in different break-points.
   */
  panelsResponsiveHiding: ?ComponentPropResponsiveObject<SidesEnum>[],
  /**
   * Render function for the 'Start Panel'.
   * The function will provided with two toggle functions: toggleOther, toggleMe
   * (toggleOther, toggleMe) => {....JSX...}
   */
  renderStartPanel: ?(() => void, () => void) => React.Node,
  /**
   * Render function for the 'End Panel'.
   * The function will provided with two toggle functions: toggleOther, toggleMe
   * (toggleOther, toggleMe) => {....JSX...}
   */
  renderEndPanel: ?(() => void, () => void) => React.Node,
  /**
   * Render function for the 'Bottom Panel'.
   */
  renderBottomPanel: ?() => React.Node,
  /**
   * logo component to display.
   */
  logo: React.ElementType,
  /**
   * Logo size in rems (font-size)
   */
  logoSize: ?number | ComponentPropResponsiveObject<number>[],
  /**
   * Misc styles for the logo component
   */
  logoMiscStyles: ?StyleProps,
  /**
   * Misc styles for the wrapper component
   */
  miscStyles: ?StyleProps,
  /**
   * Misc styles for the logo component
   */
  datetimeMiscStyles: ?StyleProps,
};

type MastheadWrapperState = {
  isDisplayStartPanel: boolean,
  isDisplayEndPanel: boolean,
  isDisplayBottomPanel: boolean,
};

export default class MastheadWrapper extends React.Component<
  MastheadWrapperProps,
  MastheadWrapperState
> {
  static defaultProps = {
    disablePanels: null,
    panelsResponsiveHiding: null,
    disableDatetime: false,
    renderStartPanel: null,
    renderEndPanel: null,
    renderBottomPanel: null,
    logoSize: 4,
    miscStyles: null,
    datetimeMiscStyles: null,
  };

  // eslint-disable-next-line react/sort-comp
  isPanelDisabled = (panel: SidesEnum) => {
    if (!this.props.disablePanels) {
      return false;
    }
    return isPanelMached(panel, isPanelMached(this.props.disablePanels));
  };

  state = {
    isDisplayStartPanel: this.props.disablePanels ? !this.isPanelDisabled('start') : true,
    isDisplayEndPanel: this.props.disablePanels ? !this.isPanelDisabled('end') : true,
    isDisplayBottomPanel: this.props.disablePanels ? !this.isPanelDisabled('bottom') : true,
  };

  internalRenderStartPanel = (renderFunc: (() => void, () => void) => React.Node): React.Node => {
    const toggleOther = this.toggleEndPanelVisibility;
    const toggleMe = this.toggleStartPanelVisibility;

    if (!this.state.isDisplayStartPanel) {
      return null;
    }
    return this.state.isDisplayStartPanel ? (
      <FelaComponent
        isFullWidth={!this.state.isDisplayEndPanel}
        panelsResponsiveHiding={this.props.panelsResponsiveHiding}
        rule={startPanelStyle}
      >
        {renderFunc(toggleOther.bind(this), toggleMe.bind(this))}
      </FelaComponent>
    ) : null;
  };

  internalRenderEndPanel = (renderFunc: (() => void, () => void) => React.Node): React.Node => {
    const toggleOther = this.toggleStartPanelVisibility;
    const toggleMe = this.toggleEndPanelVisibility;

    if (!this.state.isDisplayEndPanel) {
      return null;
    }
    return this.state.isDisplayEndPanel ? (
      <FelaComponent
        isFullWidth={!this.state.isDisplayStartPanel}
        panelsResponsiveHiding={this.props.panelsResponsiveHiding}
        rule={endPanelStyle}
      >
        {renderFunc(toggleOther.bind(this), toggleMe.bind(this))}
      </FelaComponent>
    ) : null;
  };

  internalRenderBottomPanel = (renderFunc: () => React.Node): React.Node => {
    if (!this.state.isDisplayBottomPanel) {
      return null;
    }
    return (
      <FelaComponent
        panelsResponsiveHiding={this.props.panelsResponsiveHiding}
        rule={bottomPanelStyle}
      >
        {renderFunc()}
      </FelaComponent>
    );
  };

  togglePanelVisibility = (panelName: 'start' | 'end', visibility: boolean) => {
    const newState = panelName === 'start'
      ? { isDisplayStartPanel: visibility, }
      : { isDisplayEndPanel: visibility, };
    this.setState(newState);
  };

  toggleStartPanelVisibility = () => {
    const { isDisplayStartPanel, } = this.state;
    this.togglePanelVisibility('start', !isDisplayStartPanel);
  };

  toggleEndPanelVisibility = () => {
    const { isDisplayEndPanel, } = this.state;
    this.togglePanelVisibility('end', !isDisplayEndPanel);
  };

  render() {
    const {
      renderStartPanel,
      renderEndPanel,
      renderBottomPanel,
      logo,
      logoSize,
      miscStyles,
      logoMiscStyles,
      disableDatetime,
      datetimeMiscStyles,
    } = this.props;

    const showLogo = this.state.isDisplayStartPanel && this.state.isDisplayEndPanel;

    return (
      <FelaComponent render="div" miscStyles={miscStyles} rule={wrapperStyle}>
        <FelaComponent render="div" style={headerStyle}>
          {renderStartPanel && this.state.isDisplayStartPanel
            ? this.internalRenderStartPanel(renderStartPanel)
            : null}
          <FelaComponent
            showLogo={showLogo}
            rule={logoWrapperStyle}
          >
            <LogoAndDate
              logoComponent={logo}
              logoSize={logoSize}
              logoMiscStyles={logoMiscStyles}
              disableDatetime={disableDatetime}
              datetimeMiscStyles={{
                display: [ { until: 'l', value: 'none', }, ],
                ...datetimeMiscStyles,
              }}
              tabIndex={showLogo ? 0 : 1}
            />
          </FelaComponent>
          {renderEndPanel && this.state.isDisplayEndPanel
            ? this.internalRenderEndPanel(renderEndPanel)
            : null}
        </FelaComponent>
        {renderBottomPanel ? this.internalRenderBottomPanel(renderBottomPanel) : null}
      </FelaComponent>
    );
  }
}
