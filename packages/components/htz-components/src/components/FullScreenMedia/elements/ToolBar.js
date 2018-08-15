import React, { Fragment, } from 'react';
import { FelaComponent, } from 'react-fela';
import { parseComponentProp, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import ActionButtons from '../../ActionButtons/ActionButtons';
import FlippingArrow from '../../Animations/FlippingArrow';
import Button from '../../Button/Button';
import Media from '../../Media/Media';

const toolBarWrapper = ({ theme, isOpen, }) => {
  const mobileStyle = {
    backgroundColor: rgba(theme.color('neutral'), 0.85),
    bottom: '0',
    paddingBottom: '0rem',
    position: 'absolute',
    width: '100%',
    transform: `translateY(${isOpen ? '100' : '0'}%)`,
    transition: 'transform .5s',
  };
  return {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.color('neutral'),
    display: 'flex',
    flexBasis: '0',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingBottom: '4rem',
    position: 'relative',
    width: '8rem',
    extend: [
      theme.mq({ until: 's', misc: 'portrait', }, mobileStyle),
      theme.mq({ from: 's', misc: 'portrait', }, { height: '100%', }),
      theme.mq({ until: 'm', misc: 'landscape', }, mobileStyle),
      theme.mq({ from: 'm', misc: 'landscape', }, { height: '100%', }),
    ],
  };
};

const captionIconDashStyle = theme => ({
  height: '2px',
  backgroundColor: theme.color('neutral', '-10'),
  transition: 'all .5s',
});

const captionIconStyle = ({ theme, isOpen, }) => ({
  ...captionIconDashStyle(theme),
  display: 'inline-block',
  end: '0',
  margin: '0 auto',
  opacity: '1',
  transform: isOpen ? 'translateY(-1rem) rotate(90deg)' : 'translateY(-1rem)',
  width: '3.5rem',
  ':before': {
    ...captionIconDashStyle(theme),
    ...(isOpen
      ? { transform: 'translate(1.5rem, -0.25rem) rotate(-180deg)', }
      : {}),
    position: 'absolute',
    end: isOpen ? '-1' : '0',
    top: '-1rem',
    content: '""',
    width: '3rem',
  },
  ':after': {
    ...captionIconDashStyle(theme),
    ...(isOpen ? { transform: 'translate(0, 0.25rem) rotate(180deg)', } : {}),
    position: 'absolute',
    end: isOpen ? '1' : '0',
    top: '1rem',
    content: '""',
    width: '2.5rem',
  },
});

// eslint-disable-next-line react/prop-types
const CaptionIcon = ({ isOpen, }) => (
  <FelaComponent isOpen={isOpen} rule={captionIconStyle} render="i" />
);

const Separator = () => (
  <FelaComponent
    style={theme => ({
      backgroundColor: theme.color('neutral', '-3'),
      height: '1px',
      marginBottom: '2rem',
      marginTop: '2rem',
      width: '70%',
    })}
  />
);

class ToolBar extends React.Component {
  state = {
    isOpen: false,
    toolBarWidth: null,
  };

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      toolBarWidth: this.toolBar.offsetWidth,
    });
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { closeButton, captionElement, itemName, itemUrl, } = this.props;
    return (
      <Fragment>
        <FelaComponent
          isOpen={this.state.isOpen}
          rule={toolBarWrapper}
          render={({ className, theme, }) => (
            <FelaComponent style={{ display: 'flex', }}>
              <FelaComponent
                style={{
                  backgroundColor: rgba(theme.color('neutral'), 0.85),
                  end: `${this.state.toolBarWidth}px` || '8rem',
                  height: '100%',
                  paddingStart: '4rem',
                  paddingEnd: '4rem',
                  paddingTop: '6rem',
                  position: 'absolute',
                  transform: `translateX(${this.state.isOpen ? 0 : -115}%)`,
                  transition: 'transform .5s',
                  width: '53rem',
                  ...parseComponentProp(
                    'display',
                    [
                      { until: 's', misc: 'portrait', value: 'none', },
                      { until: 'm', misc: 'landscape', value: 'none', },
                    ],
                    theme.mq,
                    (prop, value) => ({ [prop]: value, })
                  ),
                }}
              >
                {captionElement}
              </FelaComponent>
              <div
                className={className}
                ref={toolBar => (this.toolBar = toolBar)} // eslint-disable-line no-return-assign
              >
                <FelaComponent
                  style={{
                    display: 'none',
                    extend: [
                      theme.mq(
                        { from: 's', misc: 'portrait', },
                        { display: 'block', }
                      ),
                      theme.mq(
                        { from: 'm', misc: 'landscape', },
                        { display: 'block', }
                      ),
                    ],
                  }}
                >
                  <FelaComponent style={{ marginTop: '2rem', width: '100%', }}>
                    {closeButton}
                  </FelaComponent>
                  <Button
                    isFlat
                    boxModel={{ hp: 1, vp: 0.5, }}
                    miscStyles={{
                      position: 'relative',
                      backgroundColor: 'transparent',
                      width: '100%',
                      ':hover': {
                        backgroundColor: theme.color('neutral', '+1'),
                      },
                    }}
                    onClick={() =>
                      this.setState({
                        isOpen: !this.state.isOpen,
                      })
                    }
                  >
                    <CaptionIcon isOpen={this.state.isOpen} />
                  </Button>
                </FelaComponent>
                <Media query={{ until: 's', misc: 'portrait', }}>
                  {mobilePortrait => (
                    <Media query={{ until: 'm', misc: 'landscape', }}>
                      {mobileLandScape => {
                        const isMobile = mobilePortrait || mobileLandScape;
                        return (
                          <Fragment>
                            <Separator />
                            <FelaComponent
                              style={{
                                width: '100%',
                                extend: [
                                  theme.mq(
                                    { from: 's', misc: 'portrait', },
                                    { display: 'none', }
                                  ),
                                  theme.mq(
                                    { from: 'm', misc: 'landscape', },
                                    { display: 'none', }
                                  ),
                                ],
                              }}
                            >
                              {captionElement}
                            </FelaComponent>
                            <ActionButtons
                              elementName={itemName}
                              elementUrl={itemUrl}
                              buttons={[ 'facebooklogo', 'whatsapp', 'mail', ]}
                              size={isMobile ? 5 : 4}
                              isFlat
                              vertical={!isMobile}
                              globalButtonsStyles={{
                                backgroundColor: 'transparent',
                                width: '100%',
                                ...(isMobile ? {} : { marginBottom: '3rem', }),
                                ...(isMobile ? { marginEnd: '6rem', } : {}),
                                ':hover': {
                                  backgroundColor: theme.color('neutral', '+1'),
                                },
                              }}
                              globalIconsStyles={{
                                color: theme.color('neutral', '-10'),
                              }}
                              miscStyles={{
                                width: '100%',
                              }}
                            />
                          </Fragment>
                        );
                      }}
                    </Media>
                  )}
                </Media>
              </div>
            </FelaComponent>
          )}
        />
        <FelaComponent
          render={({ theme, }) => (
            <Button
              isFlat
              boxModel={{ hp: 1, vp: 0.5, }}
              miscStyles={{
                backgroundColor: 'transparent',
                position: 'absolute',
                bottom: '0',
                end: '2rem',
                ...parseComponentProp(
                  'display',
                  [
                    { from: 's', misc: 'portrait', value: 'none', },
                    { from: 'm', misc: 'landscape', value: 'none', },
                  ],
                  theme.mq,
                  (prop, value) => ({ [prop]: value, })
                ),
              }}
              onClick={() =>
                this.setState({
                  isOpen: !this.state.isOpen,
                })
              }
            >
              <FlippingArrow
                isOpen={this.state.isOpen}
                direction="dtu"
                color={[ 'neutral', '-10', ]}
                size={2}
              />
            </Button>
          )}
        />
      </Fragment>
    );
  }
}

export default ToolBar;
