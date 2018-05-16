import React from 'react';
import { createComponent, FelaComponent, } from 'react-fela';
import { createMqFunc, } from '@haaretz/htz-css-tools';
import { rgba, } from 'polished';

import ActionButtons from '../../ActionButtons/ActionButtons';
import Button from '../../Button/Button';

const toolBarWrapper = (theme, mediaWidth) => {
  const mq = createMqFunc();
  return {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: theme.color('neutral'),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-start',
    position: 'relative',
    width: '8rem',
    ...mq(
      { until: 's', },
      {
        backgroundColor: rgba(theme.color('neutral'), 0.85),
        bottom: '0',
        flexBasis: '0',
        paddingBottom: '4rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        position: 'absolute',
        start: '50%',
        transform: 'translateX(50%)',
        width: `${mediaWidth}px`,
      }
    ),
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
    ...(isOpen && { transform: 'translate(1.5rem, -0.25rem) rotate(-180deg)', }),
    position: 'absolute',
    end: isOpen ? '-1' : '0',
    top: '-1rem',
    content: '""',
    width: '3rem',
  },
  ':after': {
    ...captionIconDashStyle(theme),
    ...(isOpen && { transform: 'translate(0, 0.25rem) rotate(180deg)', }),
    position: 'absolute',
    end: isOpen ? '1' : '0',
    top: '1rem',
    content: '""',
    width: '2.5rem',
  },
});
const CaptionIcon = createComponent(captionIconStyle, 'i');

const captionIconWrapperStyle = () => ({
  position: 'relative',
});
const CaptionIconWrapper = createComponent(
  captionIconWrapperStyle,
  Button,
  props => Object.keys(props)
);

const separatorStyle = ({ theme, }) => ({
  backgroundColor: theme.color('neutral', '-3'),
  height: '1px',
  marginBottom: '2rem',
  marginTop: '2rem',
  width: '60%',
});
const Separator = createComponent(separatorStyle);

class VerticalToolBar extends React.Component {
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
    const { closeButton, captionElement, } = this.props;
    return (
      <FelaComponent
        mediaWidth={this.state.mediaWidth}
        style={toolBarWrapper}
        render={({ className, theme, }) => (
          <FelaComponent
            style={{ display: 'flex', }}
          >
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
              }}
            >
              {captionElement}
            </FelaComponent>
            <div
              className={className}
              ref={toolBar => this.toolBar = toolBar} // eslint-disable-line no-return-assign
            >
              <FelaComponent style={{ marginTop: '2rem', }}>
                {closeButton}
              </FelaComponent>
              <CaptionIconWrapper
                isFlat
                boxModel={{ hp: 1, vp: 0.5, }}
                miscStyles={{
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
              </CaptionIconWrapper>
              <Separator />
              <ActionButtons
                buttons={[ 'facebooklogo', 'whatsapp', 'mailalert', ]}
                size={3}
                isFlat
                vertical
                boxModel={{ hp: 1, vp: 1, }}
                globalButtonsStyles={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  marginBottom: '3rem',
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
            </div>
          </FelaComponent>
        )}
      />
    );
  }
}

export default VerticalToolBar;
