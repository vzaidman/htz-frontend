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

const wrapperStyle = ({ theme, miscStyles, }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'flex-end',
  justifyContent: 'center',
  extend: [ ...(miscStyles ? parseStyleProps(miscStyles, theme.mq, theme.type) : []), ],
});

const panelVisibility = (prop, isVisible) => (typeof isVisible === 'undefined' || !isVisible ? { display: 'none', } : { display: 'flex', });

const panelStyle = ({ theme, isFullWidth, showPanel, }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'flex-end',
  flexDirection: 'row',
  width: isFullWidth ? '100%' : null,
  extend: [ parseComponentProp('display', showPanel, theme.mq, panelVisibility), ],
});

const startPanelStyle = ({ theme, isFullWidth, showStartPanel, }) => ({
  ...panelStyle({ theme, isFullWidth, showPanel: showStartPanel, }),
  insetInlineStart: 0,
});

const endPanelStyle = ({ theme, isFullWidth, showEndPanel, }) => ({
  ...panelStyle({ theme, isFullWidth, showPanel: showEndPanel, }),
  insetInlineEnd: 0,
});

type MastheadWrapperProps = {
  /**
   * flag or responsive object array, defines if 'Start panel' is visible
   */
  showStartPanel: ?boolean | ComponentPropResponsiveObject<boolean>,
  /**
   * flag or responsive object array, defines if 'End panel' is visible
   */
  showEndPanel: ?boolean | ComponentPropResponsiveObject<boolean>,
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
   * Misc styles for the wrapper component
   */
  miscStyles: StyleProps,
  /**
   * Misc styles for the logo component
   */
  logoMiscStyles: StyleProps,
  /**
   * Misc styles for the date component
   */
  datetimeMiscStyles: StyleProps,
  /**
   * The logo component to display
   */
  logoComponent: React.Node,
  /**
   * Logo size in rems (font-size)
   */
  logoSize: ?number | ComponentPropResponsiveObject<number>,
};

type MastheadWrapperState = {
  isDisplayStartPanel: boolean,
  isDisplayEndPanel: boolean,
};

export default class MastheadWrapper extends React.Component<
  MastheadWrapperProps,
  MastheadWrapperState
> {
  state = {
    isDisplayStartPanel:
      typeof this.props.showStartPanel === 'boolean' ? this.props.showStartPanel : true,
    isDisplayEndPanel:
      typeof this.props.showEndPanel === 'boolean' ? this.props.showEndPanel : true,
  };

  static defaultProps = {
    showStartPanel: true,
    showEndPanel: true,
    renderStartPanel: null,
    renderEndPanel: null,
    logoSize: 4,
  };

  internalRenderStartPanel(renderFunc: (() => void, () => void) => React.Node): React.Node {
    const toggleOther = this.toggleEndPanelVisibility;
    const toggleMe = this.toggleStartPanelVisibility;

    return this.state.isDisplayStartPanel ? (
      <FelaComponent
        showStartPanel={this.props.showStartPanel}
        isFullWidth={!this.state.isDisplayEndPanel}
        rule={startPanelStyle}
      >
        {renderFunc(toggleOther.bind(this), toggleMe.bind(this))}
      </FelaComponent>
    ) : null;
  }

  internalRenderEndPanel(renderFunc: (() => void, () => void) => React.Node): React.Node {
    const toggleOther = this.toggleStartPanelVisibility;
    const toggleMe = this.toggleEndPanelVisibility;

    return this.state.isDisplayEndPanel ? (
      <FelaComponent
        showEndPanel={this.props.showEndPanel}
        isFullWidth={!this.state.isDisplayStartPanel}
        rule={endPanelStyle}
      >
        {renderFunc(toggleOther.bind(this), toggleMe.bind(this))}
      </FelaComponent>
    ) : null;
  }

  togglePanelVisibility(panelName: 'start' | 'end', visibility: boolean) {
    const newState = panelName === 'start'
      ? { isDisplayStartPanel: visibility, }
      : { isDisplayEndPanel: visibility, };
    this.setState(newState);
  }

  toggleStartPanelVisibility() {
    const { isDisplayStartPanel, } = this.state;
    this.togglePanelVisibility('start', !isDisplayStartPanel);
  }

  toggleEndPanelVisibility() {
    const { isDisplayEndPanel, } = this.state;
    this.togglePanelVisibility('end', !isDisplayEndPanel);
  }

  render() {
    const {
      renderStartPanel,
      renderEndPanel,
      logoComponent,
      logoSize,
      miscStyles,
      logoMiscStyles,
      datetimeMiscStyles,
    } = this.props;

    return (
      <FelaComponent render="div" miscStyles={miscStyles} rule={wrapperStyle}>
        {renderStartPanel && this.state.isDisplayStartPanel
          ? this.internalRenderStartPanel(renderStartPanel)
          : null}
        <FelaComponent
          style={
            this.state.isDisplayStartPanel && this.state.isDisplayEndPanel
              ? {}
              : {
                visibility: 'hidden',
                tabIndex: -1,
              }
          }
        >
          <LogoAndDate
            logoComponent={logoComponent}
            logoSize={logoSize}
            logoMiscStyles={logoMiscStyles}
            datetimeMiscStyles={{ display: [ { until: 'l', value: 'none', }, ], ...datetimeMiscStyles, }}
          />
        </FelaComponent>
        {renderEndPanel && this.state.isDisplayEndPanel
          ? this.internalRenderEndPanel(renderEndPanel)
          : null}
      </FelaComponent>
    );
  }
}
