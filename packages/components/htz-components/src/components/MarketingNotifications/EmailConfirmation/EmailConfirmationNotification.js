// @flow
/* globals fetch */
import React from 'react';
import type { Node, } from 'react';
import { FelaComponent, } from 'react-fela';
import * as style from './EmailConfirmationStyle';
import A11yDialog from '../../A11yDialog/A11yDialog';
import Button from '../../Button/Button';
import Astronaut from '../../illustrations/Astronaut/Astronaut';
import IconClose from '../../Icon/icons/IconClose';
import UserDispenser from '../../User/UserDispenser';
import ClickArea from '../../ClickArea/ClickArea';

type Props = {
  buttonText: string,
  text1: ?string,
  text2: ?string,
  onClose: ?() => void,
};

type State = {
  message: ?string,
  buttonText: string,
};

export default class EmailConfirmation extends React.Component<Props, State> {
  state = {
    message: this.props.text2,
    buttonText: this.props.buttonText,
  };

  defaultProps = {
    text1: null,
    text2: null,
    onClose: null,
  };

  render(): Node {
    const { text1, onClose, }: Props = this.props;

    return (
      <A11yDialog
        appendTo="modalRoot"
        elementToHide="pageRoot"
        isVisible
        closeOnOutsideClick
        onClose={onClose}
        isModal
        overlayBgColor="rgba(255, 255, 255, 0.5)"
        containerMiscStyles={{
          height: '46rem',
          width: '60%',
        }}
        render={({ isVisible, handleClose, isModal, }) => (
          <FelaComponent
            style={style.wrapper}
            render={({ theme, className, }) => (
              <UserDispenser
                render={({ user, }) => (
                  <div className={className}>
                    <FelaComponent style={style.innerWrapper} render="span">
                      <FelaComponent style={style.icon} render="span">
                        <Astronaut size={style.icon().size} />
                      </FelaComponent>
                      <FelaComponent style={style.text1}>{text1}</FelaComponent>
                      <FelaComponent style={style.text2}>{this.state.message}</FelaComponent>
                      <Button
                        variant={style.buttonVariant}
                        onClick={e => {
                          fetch(
                            `https://sso.themarker.com/sso/r/sendEmailValidation?eid=${user.email}`
                          )
                            .then(res => res.json())
                            .then(data => {
                              if (data.result === '1') {
                                this.setState({
                                  message: theme.marketingTools.EmailConfirmation.text2AfterClick,
                                  buttonText:
                                    theme.marketingTools.EmailConfirmation.buttonTextAfterClick,
                                });
                              }
                            });
                        }}
                        miscStyles={style.button(theme)}
                      >
                        {this.state.buttonText}
                      </Button>
                      <ClickArea miscStyles={style.closeButton(theme)} onClick={handleClose}>
                        <IconClose />
                      </ClickArea>
                    </FelaComponent>
                  </div>
                )}
              />
            )}
          />
        )}
      />
    );
  }
}
